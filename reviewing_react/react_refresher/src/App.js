import React from 'react'
import Table from './Table'

class App extends React.Component {
  removeCharacter = index => {
    const { characters } = this.state

    this.setState({
      characters: characters.filter((character, i) => {
        return i !== index
      })
    })
  }
  
  state = {
    characters: [
      {
        'name': 'Charlie',
        'job': 'Janitor'
      },
      {
        'name': 'Mac',
        'job': 'Bouncer'
      },
      {
        'name': 'Dee',
        'job': 'Aspring actress'
      },
      {
        'name': 'Dennis',
        'job': 'Bartender'
      }
    ]
  }
  render() {

    return (
      <div className="App">
        <Table 
          characterData={this.state.characters}
          removeCharacter={this.removeCharacter}
        ></Table>
      </div>
    )
  }
}

export default App