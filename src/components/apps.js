import React from 'react'
import AppItem from './app-item'
import { getGroups } from 'utils/config'

export default class Apps extends React.Component {
    constructor(props) {
        super(props)
        props.manager.watch(this)
        this.state = {
            consents: props.manager.consents,
        }
    }

    componentWillUnmount() {
        this.props.manager.unwatch(this)
    }

    update(obj, type, data) {
        if (obj === this.props.manager && type === 'consents')
            this.setState({ consents: data })
    }

    render() {
        const { config, t, manager } = this.props
        const { consents } = this.state
        const { apps } = config
        const groupAppMap = {}

        const toggle = (apps, value) => {
            apps.map((app) => {
                if (!app.required) {
                    manager.updateConsent(app.name, value)
                }
            })
        }

        const toggleAll = (value) => {
            toggle(apps, value)
        }

        const toggleGroup = (group, value) => {
            groupAppMap[group].map((app) => {
                if (!app.required) {
                    manager.updateConsent(app.name, value)
                }
            })
        }

        const appItems = getGroups(config).map((group) => {
            let appItemsList = []
            let groupApps = apps.filter((app) => app.group == group)
            groupAppMap[group] = groupApps

            const toggleableGroupApps = groupApps.filter((app) => !app.required)

            const allGroupDisabled =
                toggleableGroupApps.filter((app) => consents[app.name])
                    .length === 0

            groupApps.map((app) => {
                const toggleApp = (value) => {
                    toggle([app], value)
                }
                const checked = consents[app.name]
                appItemsList.push(
                    <li key={app.name} className="cm-app">
                        <AppItem
                            checked={checked || app.required}
                            onToggle={toggleApp}
                            t={t}
                            {...app}
                        />
                    </li>
                )
            })
            appItemsList.unshift(
                <li className="cm-app cm-toggle-group">
                    <AppItem
                        name={`disableGroup-${group}`}
                        title={t(['groups', group])}
                        description={t(['app', 'disableGroup', 'description'])}
                        checked={!allGroupDisabled}
                        onToggle={(value) => toggleGroup(group, value)}
                        t={t}
                    />
                </li>
            )
            return appItemsList
        })

        const togglableApps = apps.filter((app) => !app.required)

        const allDisabled =
            togglableApps.filter((app) => consents[app.name]).length === 0

        return (
            <ul className="cm-apps">
                {appItems}
                {togglableApps.length > 1 && (
                    <li className="cm-app cm-toggle-all">
                        <AppItem
                            name="disableAll"
                            title={t(['app', 'disableAll', 'title'])}
                            description={t([
                                'app',
                                'disableAll',
                                'description',
                            ])}
                            checked={!allDisabled}
                            onToggle={toggleAll}
                            t={t}
                        />
                    </li>
                )}
            </ul>
        )
    }
}
