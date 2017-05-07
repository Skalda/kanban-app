import React from 'react';
import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';
import Notes from './Notes';
import connect from '../libs/connect';
import LaneHeader from './LaneHeader';

const Lane = ({lane, notes, NoteActions, LaneActions, ...props}) => {

    const activateNoteEdit = id => {
        NoteActions.update({
            id: id,
            editing: true
        })
    };

    const editNote = (id, task) => {
        NoteActions.update({
            id: id,
            task: task,
            editing: false
        })
    };

    const deleteNote = (noteId, e) => {
        e.stopPropagation();
        LaneActions.detachFromLane({
            laneId: lane.id,
            noteId: noteId
        });
        NoteActions.delete(noteId);
    };

    return (
        <div {...props}>
            <LaneHeader lane={lane} />
            <Notes
                notes={selectNotesByIds(notes, lane.notes)}
                onNoteClick={activateNoteEdit}
                onEdit={editNote}
                onDelete={deleteNote} />
        </div>
    )

};

function selectNotesByIds(allNotes, noteIds = []) {
    return noteIds.reduce((notes, id) =>
        notes.concat(
            allNotes.filter(note => note.id === id)
        )
    , []);
}

export default connect(
    ({notes}) => (
        {notes}
    ), {
        NoteActions,
        LaneActions
    }
) (Lane);