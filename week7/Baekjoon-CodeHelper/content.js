// Function to extract problem information
function extractProblemInfo() {
    const problemSection = document.getElementById('problem-body');
    if (!problemSection) return null;

    // Get the webpage title from the <title> tag
    const pageTitle = document.querySelector('title')?.textContent?.trim();
    
    // Get time and memory limits from the problem-info table
    const problemInfoTable = document.getElementById('problem-info');
    const tds = problemInfoTable?.querySelector('tbody tr')?.querySelectorAll('td');
    const timeLimit = tds?.[0]?.textContent?.trim() || '';
    const memoryLimit = tds?.[1]?.textContent?.trim() || '';
    
    // Get problem description with HTML and LaTeX preserved, but remove images
    let problemDescription = '';
    const problemDescriptionElement = document.querySelector('#problem_description');
    if (problemDescriptionElement) {
        // Clone the element to avoid modifying the original page
        const clonedDescription = problemDescriptionElement.cloneNode(true);
        // Remove all img elements
        clonedDescription.querySelectorAll('img').forEach(img => img.remove());
        problemDescription = clonedDescription.innerHTML;
    } else {
        problemDescription = '';
    }
    
    // Get input format with HTML and LaTeX preserved
    const inputFormat = document.querySelector('#problem_input')?.innerHTML;
    
    // Get output format with HTML and LaTeX preserved
    const outputFormat = document.querySelector('#problem_output')?.innerHTML;
    
    // Get sample cases
    const sampleInputs = Array.from(document.querySelectorAll('pre[id^="sample-input-"]'))
        .map(el => el.textContent.trim());
    const sampleOutputs = Array.from(document.querySelectorAll('pre[id^="sample-output-"]'))
        .map(el => el.textContent.trim());
    
    // Combine sample inputs and outputs
    const samples = sampleInputs.map((input, index) => ({
        input,
        output: sampleOutputs[index]
    }));

    return {
        pageTitle,
        timeLimit,
        memoryLimit,
        problem: problemDescription,
        inputFormat,
        outputFormat,
        samples
    };
}

// Send the extracted information to the popup
function sendProblemInfo() {
    const problemInfo = extractProblemInfo();
    if (problemInfo) {
        chrome.runtime.sendMessage({
            type: 'PROBLEM_INFO',
            data: problemInfo
        });
    }
}

// Extract and send information when the page loads
sendProblemInfo();

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'GET_PROBLEM_INFO') {
        const problemInfo = extractProblemInfo();
        sendResponse(problemInfo);
    }
    return true;
});