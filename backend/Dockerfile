FROM golang:1.25

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o /lf10_weather_dashboard

EXPOSE 8080

CMD ["/lf10_weather_dashboard"]