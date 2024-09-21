import {SideLink} from '@/types/nav';
import {BarChart3, Calendar, ClipboardList, LayoutDashboard, LayoutGrid, ReceiptText, Waypoints} from 'lucide-react';
import React from 'react';

export const sidelinks: SideLink[] = [
    {
        title: 'Dashboard',
        label: '',
        href: '/dashboard',
        icon: <LayoutDashboard size={18}/>,
    },
    {
        title: 'Tasks',
        label: '3',
        href: '/tasks',
        icon: <ClipboardList size={18}/>,
    },
    {
        title: 'Facturation',
        href: '/chats',
        icon: <ReceiptText size={18}/>,
        sub: [
            {
                title: 'Devis',
                label: '',
                href: '/invoice/quotes',
            },
            {
                title: 'Facture',
                label: '',
                href: '/invoice/invoices',
            },
            {
                title: 'Clients',
                label: '',
                href: '/invoice/customers',
            },
        ],
    },
    {
        title: 'Reservation',
        label: '',
        href: '',
        icon: <Calendar size={18}/>,
        sub: [
            {
                title: "types d'évènements",
                label: '',
                href: '/event-types',
            },
            {
                title: 'Reservations',
                label: '',
                href: '/bookings',
            },
            {
                title: 'disponibilités',
                label: '',
                href: '/availabilities',
            },
            {
                title: 'Equipes',
                label: '',
                href: '/teams',
            },

        ],
    },
    {
        title: 'Apps',
        label: '',
        href: '/apps',
        icon: <LayoutGrid size={18}/>,
    },
    {
        title: 'Workflows',
        label: '',
        href: '/users',
        icon: <Waypoints size={18}/>,
    },
    {
        title: 'Analysis',
        label: '',
        href: '/analysis',
        icon: <BarChart3 size={18}/>,
    },
]