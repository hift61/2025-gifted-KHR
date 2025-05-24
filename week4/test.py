import streamlit as st
from streamlit_ace import st_ace
import io
import contextlib
from ollama import chat

#set page info
st.set_page_config(page_title = "Python Assistnat", layout="wide")
st.title("AI Python Assistant")

#set sidebar
st.sidebar.title("⚙️ Setting")
tema = st.sidebar.selectbox("🎨 Theme", ('monokai', 'github', 'dracula', 'solarized_dark', 'twilight'))
abbreviation = st.sidebar.selectbox("⌨️ Keybinding", ('vscode', 'sublime', 'emacs', 'vim'))
tool = st.sidebar.selectbox("💻 Language", ('python', 'c_cpp', 'csharp', 'javascript'))

#devide columns
col1, col2 = st.columns([5, 3])

with col1:
    # 코드 에디터 UI
    user_code = st_ace(
        language = tool,   # 언어 설정
        theme = tema,     # 테마 설정
        keybinding = abbreviation, # 단축키 스타일
        height = 300
    )
    
    run = st.button("🚀 Run")

with col2:
    st.subheader("🖥️ Terminal")
    if run and user_code:
        output_buffer = io.StringIO()
        
        try:
            with contextlib.redirect_stdout(output_buffer):
                exec(user_code, {})
        except Exception as e:
            st.error(f"❌ Error : {e}")
        else:
            output = output_buffer.getvalue()
            st.code(output if output else "✅ Execution completed (no output)", language = 'text')
    elif run:
        st.warning("⚠️ No code to run.")