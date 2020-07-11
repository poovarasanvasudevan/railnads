export function storyContextIdentifierProviderFactory(
    config = {
        objectId: 'DUMMY-OBJECT-ID',
        containerId: 'DUMMY-CONTAINER-ID',
        childObjectId: 'DUMMY-CHILD-OBJECT-ID',
    },
) {
    return Promise.resolve({
        objectId: config.objectId,
        containerId: config.containerId,
        childObjectId: config.childObjectId,
    });
}
