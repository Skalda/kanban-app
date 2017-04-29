import React from 'react';
import uuid from 'uuid';
import Notes from './Notes';

import connect from '../libs/connect';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [
                {
                    id: uuid.v4(),
                    task: 'Learn React'
                },
                {
                    id: uuid.v4(),
                    task: 'Do laundry'
                }
            ]
        }
    }

    render() {
        const {notes} = this.state;

        return (
            <div>
                {this.props.test}
                <button className="add-note" onClick={this.addNote}>+</button>
                <Notes
                    notes={notes}
                    onNoteClick={this.activateEditNote}
                    onEdit={this.editNote}
                    onDelete={this.deleteNote} />
            </div>
        );
    }

    addNote = () => {
        this.setState({
            notes: this.state.notes.concat([{
                id: uuid.v4(),
                task: 'New task'
            }])
        });
    };

    deleteNote = (id, e) => {
        e.stopPropagation();
        this.setState({
            notes: this.state.notes.filter(node => node.id !== id)
        });
    };

    activateEditNote = (id) => {
        this.setState({
            notes: this.state.notes.map(note => {
                if (note.id === id) {
                    note.editing = true;
                }

                return note;
            })
        });
    };

    editNote = (id, task) =>  {
        this.setState({
            notes: this.state.notes.map(note => {
                if(note.id === id) {
                    note.task = task;
                    note.editing = false;
                }

                return note;
            })
        })
    }
}

export default connect(() => ({
    test: 'test'
}))(App);