import NodeStore from '../../stores/NodeStore';
import LaneStore from '../../stores/LaneStore';
import storage from '../../libs/storage';
import persist from '../../libs/persist';

export default alt => {

    alt.addStore('NodeStore', NodeStore);
    alt.addStore('LaneStore', LaneStore);

    persist(alt, storage(localStorage), 'app');
}