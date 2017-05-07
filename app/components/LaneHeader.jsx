import React from 'react';
import uuid from 'uuid';
import connect from '../libs/connect';
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

    return (
        <div className="lane-header" {...props}>
            <div className="lane-add-note">
                <button onClick={addNote}>+</button>
            </div>
            <div className="lane-name">{lane.name}</div>
        </div>
    );
});