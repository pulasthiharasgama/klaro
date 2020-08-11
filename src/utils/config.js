export function getPurposes(config){
    const purposes = new Set([])
    for(let i=0;i<config.apps.length;i++){
        const appPurposes = config.apps[i].purposes || []
        for(let j=0;j<appPurposes.length;j++)
            purposes.add(appPurposes[j])
    }
    return Array.from(purposes)
}

export function getGroups(config){
    const groups = new Set([])
    for(let i = 0; i < config.apps.length; i++){
        groups.add(config.apps[i].group)
    }
    return Array.from(groups)
}
