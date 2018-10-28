import React from 'react'
import Table from './Table'
import Form from './Form'

class App extends React.Component {
  state = {
    characters: []
  }
  
  // Removes character with the index from the character array of 
  removeCharacter = index => {
    const { characters } = this.state

    this.setState({
      characters: characters.filter((character, i) => {
        return i !== index
      })
    })
  }

  // Adds a new character to the characters array
  handleSubmit = (character) => {
    this.setState({ characters: [...this.state.characters, character] })
  }

  render() {

    return (
      <div className="App">
        <Table 
          characterData={this.state.characters}
          removeCharacter={this.removeCharacter}
        ></Table>
        <Form handleSubmit={this.handleSubmit} ></Form>
      </div>
    )
  }
}

export default App