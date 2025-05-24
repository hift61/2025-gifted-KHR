import streamlit as st
from ollama import chat

# set page info
st.set_page_config(page_title="I'm Coder!")
st.title("Welcome to Coder AI")
st.subheader("I'll help you solve the problem!")

# create chat history
if "messages" not in st.session_state:
    st.session_state.messages = []
#system prompt

language = st.sidebar.selectbox('language', ('Python', 'C'))
sys_prompt = {
    "Python": """You are a Python assistant. Treat every user input as a command to implement the request as executable Python code. Always think programmatically and solve real-life, emotional, or abstract prompts by writing functional, logical code that performs the requested task.

- If the user asks for information like weather, fetch it using real APIs (e.g., requests with OpenWeatherMap).
- For social or emotional requests (e.g., 'how to make up with my girlfriend'), write functions that model the logic using variables and conditions.
- For any task, include necessary imports, API calls, data processing, and output.
- Never simulate, never reply in plain text, and never just print the input.
- Think like you are building real software that solves the user's intent with code.

Example:

def apologize(girlfriend_emotion):
    if girlfriend_emotion < 30:
        return "Write a sincere letter and give her favorite dessert"
    elif girlfriend_emotion < 60:
        return "Apologize directly and give her space"
    else:
        return "Talk openly and plan a date"

print(apologize(45))
""",

    "C": """You are a C assistant. Interpret every input as a programming task requiring real C code. Use system libraries or external libs (like libcurl, cJSON) to solve real-world problems — such as fetching live data or modeling emotional states in logic.

Examples:
- For weather, use libcurl to call an API and parse JSON.
- For emotional advice, write functions evaluating variables with conditions.
- Provide complete, compilable C programs.
- Never simulate or respond with plain text.

Example:

#include <stdio.h>
int apologize(int emotion) {
    if (emotion < 30) return 1; // write letter
    else if (emotion < 60) return 2; // apologize directly
    else return 3; // plan date
}
int main() {
    int action = apologize(45);
    printf("Action code: %d", action);
    return 0;
}
"""
}

prompt = st.chat_input("Write something")
response_text = ""

if prompt:
    st.write("😎User:")
    st.write(prompt)
    
    messages = [{"role":"system", "content":sys_prompt[language]}] + \
        st.session_state.messages + \
        [{"role":"user", "content" : prompt}]
    
    stream = chat(
        model = 'llama3.2',
        messages=messages,
        stream=True
    )
    
    st.write("🤖Coder AI:")
    placeholder = st.empty()
    
    for chunk in stream:
        response_text += chunk.message.content
        placeholder.markdown(
            f"<span style='font-size:18px'>{response_text}</span>",
            unsafe_allow_html=True
        )
    
    st.session_state.messages.append({"role":"user", "content" : prompt})
    st.session_state.messages.append({"role":"assistant", "content":response_text})
st.divider()
for msg in st.session_state.messages:
    if msg["role"] == "user":
        st.markdown(f"<span style = 'color:red'>User</span>:{msg['content']}", unsafe_allow_html=True)
    elif msg["role"] == "assistant":
        st.markdown(f"<span style = 'color:blue'>Coder AI</span>:{msg['content']}", unsafe_allow_html=True)