<?php

namespace App\Http\Services;

use App\Models\RKAKLData;
use App\Models\RKAKLDocument;
use ricardoboss\Console;
use Termwind\ValueObjects\Node;
use function Symfony\Component\Translation\t;

class RKAKLDocumentService
{
    public function saveDocumentTree(TreeNode $node, string $documentID, int|null $parentComponent) {
        $doc = new RKAKLData();
        if ($node->getType() != "root") {
            $doc->type = $node->getType();
            $doc->document_id = $documentID;
            $doc->component_code = $node->getData();
            $doc->parent_component = $parentComponent;
            $doc->volume = $node->qty;
            $doc->amount = $node->amount;
            $doc->total_amount = $node->totalAmount;
            $doc->save();
        }

        foreach ($node->children as $child) {
            if ($child instanceof TreeNode) {
                $this->saveDocumentTree($child, $documentID, $doc->id);
            }
        }
    }

    public function getDocumentDataByDocumentID(int $documentID) : TreeNode {
        $nodes = RKAKLData::where('document_id', '=', $documentID)
            ->whereNull('parent_component')
            ->get();

        $documentData = new TreeNode('root', 'root', '', '', 0, 0);
        foreach ($nodes as $node) {
            $newNode = new TreeNode($node->type, $node->component_code, $node->component_code, $node->volume, $node->amount, $node->total_amount);

            $child = RKAKLData::where('document_id', '=', $documentID)
                ->where('parent_component', '=', $node->id)
                ->count();

            if ($child > 0) {
                $childData = $this->getChildNodeByParent($documentID, $node->id, $newNode);
                foreach ($childData as $data) {
                    if ($data instanceof TreeNode) {
                        $newNode->setParent($documentData);
                        $newNode->children[] = $data;
                    }
                }}

            $documentData->addChildWithoutValidation($newNode);
        }

        $documentData->fillMasterData();

        return $documentData;
    }

    protected function getChildNodeByParent(int $documentID, int $parentComponent, TreeNode $parentNode) : array | null {
        $child = RKAKLData::where('document_id', '=', $documentID)
            ->where('parent_component', '=', $parentComponent)
            ->get();

        $childNode = [];
        foreach ($child as $node) {
            $newNode = new TreeNode($node->type, $node->component_code, $node->component_code, $node->volume, $node->amount, $node->total_amount);
            $child = RKAKLData::where('document_id', '=', $documentID)
                ->where('parent_component', '=', $node->id)
                ->count();

           if ($child > 0) {
               $childData = $this->getChildNodeByParent($documentID, $node->id, $newNode);
               foreach ($childData as $data) {
                   if ($data instanceof TreeNode) {
                       $newNode->setParent($parentNode);
                       $newNode->children[] = $data;
                   }
               }
           }


            $childNode[] = $newNode;
        }

        return $childNode;

    }

    public function createSummary(array $documentData)
    {
        // get first data as summary field
        $summaryData = TreeNode::class;
        if ($documentData[0] instanceof TreeNode) {
            $summaryData = clone $documentData[0];
        }

        $summaryData->resetAllValue();
        $summaryData->printTree();

        foreach ($documentData as $documentDatum) {
            foreach ($summaryData->children as $child) {
                if ($child instanceof TreeNode) {
                    $child->createSummaryTotal($documentDatum);
                }
            }
        }


        return $summaryData;
    }
}
