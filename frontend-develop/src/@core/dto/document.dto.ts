export interface Document {
  lembaga_code: string
  unit_kerja_code: string
  unit_org_code: string
  version: number
  is_active: boolean
  year: string
  updated_at: string
  created_at: string
  id: number
}

export interface DocumentNode {
  type: string
  value: string
  data: string
  label: string | null
  volume: string
  amount: number
  totalAmount: number
  children: DocumentNode[]
}

export interface DocumentData {
  type: string
  value: string
  data: string
  label: string | null
  volume: string
  amount: number
  totalAmount: number
  children: DocumentNode[]
}

export interface RKAKLGenerateResponse {
  success: boolean
  data: {
    document: Document
    documentData: DocumentData
  }
}

export interface RKAKLExportResponse {
  data: {
    success: boolean
    data: {
      url: string
    }
  }
}
