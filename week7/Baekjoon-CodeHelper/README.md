# Baekjoon Problem Helper

A Chrome extension that extracts and displays problem information from Baekjoon Online Judge in a convenient popup format.

## Features

- Extracts problem description, input format, output format, and sample cases
- Clean and organized display in a popup window
- Works on any Baekjoon Online Judge problem page
- Easy to use interface

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the directory containing this extension
5. The extension icon should appear in your Chrome toolbar

## Usage

1. Navigate to any problem page on Baekjoon Online Judge (e.g., https://www.acmicpc.net/problem/1000)
2. Click the extension icon in your Chrome toolbar
3. The popup will display the problem information in an organized format:
   - Problem description
   - Input format
   - Output format
   - Sample input/output cases

## Development

The extension consists of the following files:
- `manifest.json`: Extension configuration
- `popup.html`: Popup window layout
- `popup.js`: Popup window functionality
- `content.js`: Content script for extracting problem information
- `images/`: Extension icons

## License

MIT License 