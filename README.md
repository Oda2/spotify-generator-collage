# Spotify Generator Collage

> ⚠️ **Deprecation Notice**
> 
> Due to [new Spotify API access limitations](https://developer.spotify.com/blog/2026-02-06-update-on-developer-access-and-platform-security), this project is in **maintenance-only mode** and is no longer actively developed.
> 
> The project only works for **Spotify Premium** users who want to test the functionality. Since I am no longer a Spotify Premium user, I cannot guarantee the continued functionality of the application.

## Overview

Spotify Generator Collage is a web application that generates visual collages from your most listened albums on Spotify. It connects to your Spotify account via OAuth, retrieves your top albums based on listening history, and arranges them into a customizable collage that you can view and share.

## Features

- **Spotify OAuth Integration** - Secure login using your Spotify account
- **Top Albums Retrieval** - Fetches your most played albums from different time ranges (short-term, medium-term, long-term)
- **Customizable Collages** - Choose from different grid layouts and configurations
- **Multi-language Support** - Available in English, Portuguese, Spanish, and Japanese
- **Export Options** - Download your generated collage as an image

## How It Works

1. Log in with your Spotify account
2. Select the time range for your top albums
3. Choose your preferred collage layout
4. Generate and download your personalized collage

## Installation

```sh
$ npm install
```

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Spotify Web API

## License

Licensed under [MIT](LICENSE)
