import React from 'react'
import {asd} from './'

export class Test extends Component {
    state = {
        keywords: '',
        imagesLoaded: [{
            title: '',
            fileURL: ''
        },
        {
            title: '',
            fileURL: ''
        }]
    }

    handleChange = (event) => {
        this.setState({
            keywords: event.target.value
        })
    }

    render() {
    return (
      <div>
        <input onChange={(event) => this.handleChange(event)} type='text'></input>
        {this.state.keywords && this.keywords.includes('dog') && 
            <div>
                    <img src='https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjdrfOwkc7gAhU1Pn0KHYg7CCIQjRx6BAgBEAU&url=https%3A%2F%2Fwww.wlwt.com%2Farticle%2Fohio-shelter-dog-who-was-adopted-after-1-145-days-returned-to-shelter%2F26390131&psig=AOvVaw3iiqbTXm2z20IuxsyDcKra&ust=1550883496503453' />
            </div>
        }

      </div>
    )
  }
}

export default Test



import Test from 'react'

export const componentName = () => {
  return (
    <div>
      
    </div>
  )
}
const componentName = () => {
    return (
      <div>
        
      </div>
    )
  }

const componentName = () => {
    return (
      <div>
        
      </div>
    )
  }