// Function to create a sample case element
function createSampleCase(input, output, index) {
    const sampleCase = document.createElement('div');
    sampleCase.className = 'sample-case';
    
    const inputTitle = document.createElement('div');
    inputTitle.className = 'sample-title';
    inputTitle.textContent = `Sample Input ${index + 1}`;
    
    const inputContent = document.createElement('div');
    inputContent.className = 'content';
    inputContent.textContent = input;
    
    const outputTitle = document.createElement('div');
    outputTitle.className = 'sample-title';
    outputTitle.textContent = `Sample Output ${index + 1}`;
    
    const outputContent = document.createElement('div');
    outputContent.className = 'content';
    outputContent.textContent = output;
    
    sampleCase.appendChild(inputTitle);
    sampleCase.appendChild(inputContent);
    sampleCase.appendChild(outputTitle);
    sampleCase.appendChild(outputContent);
    
    return sampleCase;
}

// Function to safely set HTML content with LaTeX
function setMathContent(element, content) {
    if (!content) {
        element.innerHTML = 'No content available';
        return;
    }
    
    // Safely set the HTML content
    element.innerHTML = content;
    
    // Trigger MathJax to process the new content
    if (window.MathJax) {
        MathJax.typesetPromise([element]).catch((err) => {
            console.error('MathJax error:', err);
        });
    }
}

// Function to display problem information
function displayProblemInfo(problemInfo) {
    const pageTitleElement = document.getElementById('page-title');
    const problemInfoDiv = document.getElementById('problem-info');
    const limitsTable = document.getElementById('limits-table');
    
    if (!problemInfo) {
        // Show only title and message
        pageTitleElement.textContent = 'Baekjoon Problem Helper';
        problemInfoDiv.innerHTML = '<div style="text-align: center; padding: 20px;">Please navigate to a Baekjoon problem page to view problem information.</div>';
        // Hide limits table
        limitsTable.style.display = 'none';
        return;
    }

    // Show all elements for problem page
    limitsTable.style.display = 'table';
    
    // Set the page title at the top of the popup
    pageTitleElement.textContent = problemInfo.pageTitle || 'Baekjoon Problem Helper';
    
    // Set the time and memory limits in the table
    document.getElementById('time-limit').textContent = problemInfo.timeLimit || 'N/A';
    document.getElementById('memory-limit').textContent = problemInfo.memoryLimit || 'N/A';
    
    // Set problem description with LaTeX support
    setMathContent(document.getElementById('problem-description'), problemInfo.problem);
    
    // Set input format with LaTeX support
    setMathContent(document.getElementById('input-format'), problemInfo.inputFormat);
    
    // Set output format with LaTeX support
    setMathContent(document.getElementById('output-format'), problemInfo.outputFormat);
    
    // Clear and set sample cases
    const sampleCasesContainer = document.getElementById('sample-cases');
    sampleCasesContainer.innerHTML = '';
    
    if (problemInfo.samples && problemInfo.samples.length > 0) {
        problemInfo.samples.forEach((sample, index) => {
            const sampleElement = createSampleCase(sample.input, sample.output, index);
            sampleCasesContainer.appendChild(sampleElement);
        });
    } else {
        sampleCasesContainer.textContent = 'No sample cases available';
    }
}

// When popup opens, query the active tab for problem information
document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        if (activeTab.url.includes('acmicpc.net/problem/')) {
            chrome.tabs.sendMessage(
                activeTab.id,
                { type: 'GET_PROBLEM_INFO' },
                (response) => {
                    if (chrome.runtime.lastError) {
                        displayProblemInfo(null);
                        return;
                    }
                    displayProblemInfo(response);
                }
            );
        } else {
            displayProblemInfo(null);
        }
    });
});