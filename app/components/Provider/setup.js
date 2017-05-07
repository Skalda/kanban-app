import NodeStore from '../../stores/NodeStore';
import storage from '../../libs/storage';
import persist from '../../libs/persist';

export default alt => {
    alt.addStore('NodeStore', NodeStore);

    persist(alt, storage(localStorage), 'app');
}