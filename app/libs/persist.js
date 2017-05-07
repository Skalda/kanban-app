export default function (alt, storage, storageName) {
    try {
        alt.bootstrap(storage.get(storageName));
    } catch (e) {
        console.error('Failed to bootstrap', e);
    }

    alt.FinalStore.listen(() => {
        if (!storage.get('debug')) {
            storage.set(storageName, alt.takeSnapshot());
        }
    })
}