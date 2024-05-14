import { Link } from "react-router-dom";
import { Menubar } from 'primereact/menubar';

import { Badge } from 'primereact/badge';
import logo from '../logo.svg';

export default function Navigation() {
    const itemRenderer = (item: any) => (
        <Link to={item.url ?? ""} className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </Link>
    );
    const items = [
        {
            label: 'Init',
            icon: 'pi pi-home',
            url: "/",
            template: itemRenderer
        },
        {
            label: 'Account',
            icon: 'pi pi-users',
            url: "/account",
            template: itemRenderer
        },
        {
            label: 'Tokens',
            icon: 'pi pi-star',
            url: "/tokens",
            template: itemRenderer
        },
        {
            label: 'Contract',
            icon: 'pi pi-key',
            url: "/contract",
            template: itemRenderer
        },
        {
            label: 'Exchange',
            icon: 'pi pi-clone',
            url: "/exchange",
            template: itemRenderer
        },
        // {
        //     label: 'Projects',
        //     icon: 'pi pi-search',
        //     items: [
        //         {
        //             label: 'Core',
        //             icon: 'pi pi-bolt',
        //             shortcut: '⌘+S',
        //             template: itemRenderer
        //         },
        //         {
        //             label: 'Blocks',
        //             icon: 'pi pi-server',
        //             shortcut: '⌘+B',
        //             template: itemRenderer
        //         },
        //         {
        //             label: 'UI Kit',
        //             icon: 'pi pi-pencil',
        //             shortcut: '⌘+U',
        //             template: itemRenderer
        //         },
        //         {
        //             separator: true
        //         },
        //         {
        //             label: 'Templates',
        //             icon: 'pi pi-palette',
        //             items: [
        //                 {
        //                     label: 'Apollo',
        //                     icon: 'pi pi-palette',
        //                     badge: 2,
        //                     template: itemRenderer
        //                 },
        //                 {
        //                     label: 'Ultima',
        //                     icon: 'pi pi-palette',
        //                     badge: 3,
        //                     template: itemRenderer
        //                 }
        //             ]
        //         }
        //     ]
        // },
    ];

    const start = <img alt="logo" src={logo} height="30" className="ml-3 mr-3"></img>;

    return (
        <div className="card">
            <Menubar model={items} start={start} />
        </div>
    )
}
        