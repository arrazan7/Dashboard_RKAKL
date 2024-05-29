// ** Type import
import path from 'path'
import { title } from 'process'
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: 'mdi:home-outline',
      children: [
        {
          title: 'Dashboard 1',
          icon: 'ic:outline-home',
          path: '/dashboard/tableau1'
        },
        {
          title: 'Dashboard 2',
          icon: 'ic:outline-home',
          path: '/dashboard/tableau2'
        },
        {
          title: 'Dashboard 3',
          icon: 'ic:outline-home',
          path: '/dashboard/tableau3'
        },
        {
          title: 'Dashboard 4',
          icon: 'ic:outline-home',
          path: '/dashboard/tableau4'
        }
      ]
      // badgeContent: 'new',
      // badgeColor: 'error',
    },
    {
      sectionTitle: 'Data'
    },
    {
      title: 'RKAKL',
      icon: 'mdi:text-box',
      path: '/rkakl',
      children: [
        {
          title: 'List',
          icon: 'mdi:text-box',
          path: '/rkakl'
        },
        {
          title: 'Import',
          icon: 'mdi:text-box',
          path: '/rkakl/import'
        },
        {
          title: 'Export',
          icon: 'mdi:text-box',
          path: '/rkakl/export'
        }
      ]
    },
    {
      title: 'Master Data',
      icon: 'mdi:file-document-outline',
      children: [
        {
          title: 'Kode Belanja',
          icon: 'mdi:file-document-outline',
          children: [
            {
              title: 'List',
              path: '/kode-belanja/list',
              icon: 'mdi:file-document-outline'
            },
            {
              title: 'Add',
              path: '/kode-belanja/add',
              icon: 'mdi:file-document-outline'
            }
          ]
        },
        {
          title: 'Kode SATKER',
          icon: 'mdi:file-document-outline',
          children: [
            // {
            //   title: 'Lembaga',
            //   path: '/satker/lembaga/list',
            //   icon: 'mdi:file-document-outline'
            // },
            // {
            //   title: 'Unit Organisasi',
            //   path: '/satker/unit-organisasi/list',
            //   icon: 'mdi:file-document-outline'
            // },
            {
              title: 'Unit Kerja',
              path: '/satker/unit-kerja/list',
              icon: 'mdi:file-document-outline'
            }
          ]
        }
      ]
    },
    // {
    //   sectionTitle: 'Data Visualization'
    // },
    // {
    //   title: 'Menu Management',
    //   icon: 'mdi:text-box',
    //   path: '/Dd'
    // },
    // {
    //   title: 'Config Management',
    //   icon: 'mdi:text-box',
    //   path: '/Dd'
    // },
    {
      sectionTitle: 'Account Setting'
    },
    {
      title: 'User',
      icon: 'mdi:account-outline',
      path: '/user/list'
      // children: [
      //   {
      //     title: 'List',
      //     path: '/apps/user/list'
      //   },
      //   {
      //     title: 'View',
      //     children: [
      //       {
      //         title: 'Overview',
      //         path: '/apps/user/view/overview'
      //       },
      //       {
      //         title: 'Security',
      //         path: '/apps/user/view/security'
      //       },
      //       {
      //         title: 'Billing & Plans',
      //         path: '/apps/user/view/billing-plan'
      //       },
      //       {
      //         title: 'Notifications',
      //         path: '/apps/user/view/notification'
      //       },
      //       {
      //         title: 'Connection',
      //         path: '/apps/user/view/connection'
      //       }
      //     ]
      //   }
      // ]
    }
    // {
    //   title: 'Roles & Permissions',
    //   icon: 'mdi:shield-outline',
    //   children: [
    //     {
    //       title: 'Roles',
    //       path: '/apps/roles'
    //     },
    //     {
    //       title: 'Permissions',
    //       path: '/apps/permissions'
    //     }
    //   ]
    // }
  ]
}

export default navigation
