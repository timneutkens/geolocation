
import Head from 'next/head'
import {Component} from 'react'
export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      geolocation: {}
    }

    this.getLocation = this.getLocation.bind(this)
  }
  getLocation() {
    this.setState({ loading: true })
    navigator.geolocation.getCurrentPosition(({coords}) => {
      const {accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed} = coords
      const geolocation = {accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed}
      this.setState({ loading: false })
      this.setState({ geolocation })
    }, (err) => {
      this.setState({ loading: false })
      this.setState({ geolocation: err })
    })
  }
  render() {
    const {loading, geolocation} = this.state
    return (
      <div>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1'/>
        </Head>

        <h1>navigator.geolocation demo</h1>
        <button onClick={this.getLocation}>{loading ? 'Loading...' : 'get location'}</button>

        <div className="json">
          <pre>{JSON.stringify(geolocation, null, '  ')}</pre>
        </div>

        <style jsx global>{`
          html, body {
            height: 100%;
          }

          body {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
            text-align: center;
          }

          h1 {
            font-weight: 100;
          }

          button {
            margin-top: 50px;
            padding: 10px;
            font-size: 14px;
            color: #333;
            background: transparent;
            border: 1px solid #eee;
            cursor: pointer;
          }

          .json {
            display: flex;
            justify-content: center;
            margin-top: 50px;
          }

          pre {
            text-align: left;
            min-height: 140px;
          }
        `}</style>
      </div>
    )
  }
}
