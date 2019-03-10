import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from './styles/Form'
import formatMoney from '../lib/formatMoney'
import ErrorMessage from '../components/ErrorMessage'

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`

class CreateItems extends Component {
  state = {
    title: 'dsdsd',
    description: 'Nice description',
    image: 'dog.jpg',
    largeImage: 'large-dog.jpg',
    price: 1000
  }

  handleChange = e => {
    const { name, type, value } = e.target
    // if the input is a number type, coerce the string into a number
    const val = type === 'number' ? parseInt(value) : value
    // setstate according the the name of the input to be updated
    this.setState({ [name]: val })
  }
  
  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form
            onSubmit={async (e) => {
              // Stopo form from subittinfg. Prevent default control of form so we can handle it with state
              e.preventDefault()
              // call the mutation
              const response = await createItem()
              // change to single item page
              Router.push({
                pathname: '/item',
                query: { id: response.data.createItem.id }
              })
              
            }}
          >
            <ErrorMessage error={ error }/>

            <fieldset disabled={loading} aria-busy={loading} >
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <label htmlFor="price">
                Price
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="price"
                  value={this.state.price}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <label htmlFor="desciption">
                Desciption
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  placeholder="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  required
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default CreateItems
export { CREATE_ITEM_MUTATION }
