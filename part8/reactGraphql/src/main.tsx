
import App from './App'

import { ApolloClient,ApolloProvider, InMemoryCache, gql } from '@apollo/client'
import { createRoot } from 'react-dom/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),

})

const query = gql`
query {
  allPersons  {
    name,
    phone,
    address {
      street,
      city
    }
    id
  }
}
`

client.query({ query })
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.error('Error fetching data:', error)
  })


  const root = createRoot(document.getElementById('root')!)
  root.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )