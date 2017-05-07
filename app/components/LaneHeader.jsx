import React from 'react';
import uuid from 'uuid';
import connect from '../libs/connect';
import Editable from './Editable';
import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';

export default connect(() => ({}), {
    NoteActions,
    LaneActions
})(({lane, NoteActions, LaneActions, ...props}) => {
    const addNote = e => {
        e.stopPropagation();

        let noteId = uuid.v4();

        NoteActions.create({
            id: noteId,
            task: 'New task'
        });
        LaneActions.attachToLane({
            laneId: lane.id,
            noteId: noteId
        });
    };

    const activateLaneEdit = () => {
        LaneActions.update({
            id: lane.id,
            editing: true
        });
    };

    const editLine = name => {
        LaneActions.update({
            id: lane.id,
            name,
            editing: false
        })
    };

    const deleteLine = e => {
        e.stopPropagation();
        LaneActions.delete(lane.id);
    };

    return (
        <div className="lane-header" {...props} onClick={activateLaneEdit}>
            <div className="lane-add-note">
                <button onClick={addNote}>+</button>
            </div>

            <Editable className="lane-name" editing={lane.editing} value={lane.name} onEdit={editLine} />
            <div className="lane-delete">
                <button onClick={deleteLine}>x</button>
            </div>
        </div>
    );
});