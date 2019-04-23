import React from 'react';
import Timer from './components/Timer';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import ClearButton from './components/ClearButton';
import EmptyState from './components/EmptyState';

import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clearCompletedItems = this.clearCompletedItems.bind(this);
    this.startSession = this.startSession.bind(this);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
    this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);

    this.state = {
      items: [],
      nextItemId: 0,
      sessionIsRunning: false,
      itemIdRunning: null,
    };
  }

  addItem(description) {
    const { nextItemId } = this.state;
    const newItem = {
      id: nextItemId,
      description: description,
      sessionsCompleted: 0,
      isCompleted: false,
    };
    this.setState((prevState => ({
      // TODO 2: append new items to list and increase nextItemId by 1
      items: prevState.items.concat(newItem),
      nextItemId: prevState.nextItemId + 1
    })));
  }

  clearCompletedItems() {
    // TODO 6
    var newItems = this.state.items;
    newItems = newItems.filter(item => !item.isCompleted)
    this.setState({
      items: newItems
    })
  }

  increaseSessionsCompleted(itemId) {
    var newItem = null;
    var newItems = [];
    for (var i = 0; i < this.state.items.length; i++) {
      if (this.state.items[i].id === itemId) {
        newItem = {
          id: itemId,
          description: this.state.items[i].description,
          sessionsCompleted: this.state.items[i].sessionsCompleted + 1,
          isCompleted: false
        }
        newItems = this.state.items;
        newItems[i] = newItem;
        this.setState({
          items: newItems
        })
        break;
      }
    }
  }

  toggleItemIsCompleted(itemId) {
    var newItem = null;
    var newItems = [];
    for (var i = 0; i < this.state.items.length; i++) {
      if (this.state.items[i].id === itemId) {
        newItem = {
          id: itemId,
          description: this.state.items[i].description,
          sessionsCompleted: this.state.items[i].sessionsCompleted,
          isCompleted: true
        }
        newItems = this.state.items;
        newItems[i] = newItem;
        this.setState({
          items: newItems
        })
        break;
      }
    }
  }

  startSession(id) {
    this.state.sessionIsRunning = true;
    this.state.itemIdRunning = id;
  }

  render() {
    const {
      items,
      sessionIsRunning,
      itemIdRunning,
      areItemsMarkedAsCompleted,
    } = this.state;
    return (
      <div>
      {(this.state.items.length !== 0) ? (<div className="flex-wrapper">
        <div className="container">
          <header>
            <h1 className="heading">Today</h1>
            {areItemsMarkedAsCompleted && <ClearButton onClick={this.clearCompletedItems} />}
          </header>
          {this.state.sessionIsRunning &&
            <Timer
              mode="WORK"
              key={this.state.itemIdRunning}
              onSessionComplete={() => this.increaseSessionsCompleted(itemIdRunning)}
              autoPlays
            />
          }
            <div className="items-container">
            {items.map((item) => (
              <TodoItem 
                description={item.description}
                key={item.id}
                isCompleted={item.isCompleted}
                startSession={() => this.startSession(item.id)}
                toggleIsCompleted={() => this.toggleItemIsCompleted(item.id)}
              />
            ))}
            </div>
        </div>
      </div>) : (<EmptyState />)}
      <footer>
          <TodoInput addItem={this.addItem} />
      </footer>
      </div>
    );
  }
}

export default App;
