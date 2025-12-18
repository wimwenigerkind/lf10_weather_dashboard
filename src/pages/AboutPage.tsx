import {Card, Col, Row} from "react-bootstrap";

function AboutPage() {
  return (
    <>
      <h1 className="mb-4">About Weather Dashboard</h1>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Project Overview</Card.Title>
          <Card.Text>
            Weather Dashboard is a modern React web application that enables users to retrieve and visualize
            weather data for cities worldwide. Search for any city, view detailed weather forecasts, and save
            your favorite locations for quick access.
          </Card.Text>
        </Card.Body>
      </Card>

      <Row className="g-3 mb-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Features</Card.Title>
              <ul>
                <li>Search cities worldwide by name</li>
                <li>View 7-day weather forecast with min/max temperatures</li>
                <li>Interactive map showing city location</li>
                <li>High-quality city images from Unsplash</li>
                <li>Save cities as favorites</li>
                <li>Persistent data storage (localStorage)</li>
                <li>Fast performance with Redis caching</li>
                <li>Responsive design for all devices</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Frontend Technologies</Card.Title>
              <ul>
                <li><strong>React</strong> - UI Framework</li>
                <li><strong>TypeScript</strong> - Type Safety</li>
                <li><strong>React Router</strong> - Navigation</li>
                <li><strong>Bootstrap</strong> - Styling</li>
                <li><strong>Recharts</strong> - Data Visualization</li>
                <li><strong>Leaflet</strong> - Interactive Maps</li>
                <li><strong>Vite</strong> - Build Tool</li>
                <li><strong>Bun</strong> - Package Manager</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3 mb-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Backend Technologies</Card.Title>
              <ul>
                <li><strong>Go (Golang 1.25)</strong> - Backend Runtime</li>
                <li><strong>Gin</strong> - Web Framework</li>
                <li><strong>Redis</strong> - Caching Layer</li>
                <li><strong>CORS Middleware</strong> - Cross-Origin Support</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Performance & Caching</Card.Title>
              <Card.Text>
                The backend implements <strong>Redis caching</strong> to optimize performance and reduce API calls.
              </Card.Text>
              <ul>
                <li><strong>Image Cache:</strong> 24-hour TTL per query</li>
                <li><strong>Strategy:</strong> Cache-aside pattern</li>
                <li><strong>Benefits:</strong> Faster load times, reduced API costs</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Data Sources & APIs</Card.Title>
          <Card.Text>
            This application integrates multiple external APIs to provide comprehensive weather and location data.
          </Card.Text>

          <h6 className="mt-3">Weather & Geocoding</h6>
          <Card.Text>
            <strong>Open-Meteo API</strong> provides free, open-source weather data without requiring an API key.
          </Card.Text>
          <ul>
            <li>
              <strong>Geocoding API:</strong> City search and location data
            </li>
            <li>
              <strong>Weather Forecast API:</strong> 7-day temperature forecasts with min/max temperatures
            </li>
          </ul>

          <h6 className="mt-3">City Images</h6>
          <Card.Text>
            <strong>Unsplash API</strong> provides high-quality, royalty-free images for cities.
          </Card.Text>
          <ul>
            <li>
              <strong>Image Search:</strong> Dynamic city images based on search queries
            </li>
            <li>
              <strong>Backend Proxy:</strong> API requests are handled through the Go backend with Redis caching
            </li>
          </ul>

          <Card.Text className="text-muted mt-3">
            Data provided by: <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Open-Meteo</a> and <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer">Unsplash</a>
          </Card.Text>
        </Card.Body>
      </Card>

      <Row className="g-3 mb-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Learning Project</Card.Title>
              <Card.Text>
                This project was developed as part of LF10 (Lernfeld 10) to demonstrate modern React development
                practices including state management, API integration, routing, and responsive design.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Links & Resources</Card.Title>
              <ul>
                <li>
                  <strong>GitHub Repository:</strong>{' '}
                  <a href="https://github.com/wimwenigerkind/lf10_weather_dashboard" target="_blank" rel="noopener noreferrer">
                    wimwenigerkind/lf10_weather_dashboard
                  </a>
                </li>
                <li>
                  <strong>About Me:</strong>{' '}
                  <a href="https://wimwenigerkind.com" target="_blank" rel="noopener noreferrer">
                    wimwenigerkind.com
                  </a>
                </li>
                <li>
                  <strong>Live Demo:</strong>{' '}
                  <a href="https://lf10-weather-dashboard.wimdev.de" target="_blank" rel="noopener noreferrer">
                    lf10-weather-dashboard.wimdev.de
                  </a>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default AboutPage
