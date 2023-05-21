import { AdminLayout } from "../../components/AdminLayout.js"
import { Page } from "../../components/Page.js"
import { TabContent, TabItem, TabList, TabPanel, Tabs } from "../../components/Tabs.js"
import { Card, CardBody, CardHeader } from "../../components/index.js"

function Icon({name, ...props}) {
    return 'ICON'
} 

export default () => {
    return Page({
        layout: AdminLayout,
        body: Card({
            slot: Tabs({
                
        slot: [
            CardHeader({
                slot: TabList({
                    slot: [
                        TabItem({
                            active: true, 
                            slot: Icon({name: 'home'})
                        }),
                        TabItem({
                            slot: Icon({name: 'user'})
                        }),
                        TabItem({
                            ms: 'auto',
                            slot: Icon({name: 'settings'})
                        }),
                    ]
                })
            }),
            CardBody({
                slot: TabContent({
                    slot: [
                        TabPanel({
                            active: true,
                            slot: 'Here is the content of the first tab.'
                        }),
                        TabPanel({
                            slot: 'Here is the content of the second tab.'
                        }),
                        TabPanel({
                            slot: 'Here is the content of the third tab.'
                        }),
                    ]
                })
            })
        ]
    })
})   
})   
}