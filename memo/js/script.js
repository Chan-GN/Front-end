const API_BASE_URL = 'http://localhost:8080';

document.addEventListener('DOMContentLoaded', function () {
    const memoForm = document.getElementById('memoForm');
    const memoInput = document.getElementById('memoInput');
    const memoList = document.getElementById('memoList');
    const errorMessage = document.createElement('div');
    errorMessage.id = 'errorMessage';
    document.body.appendChild(errorMessage);

    memoForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const memoText = memoInput.value.trim();
        if (memoText) {
            await addMemo(memoText);
            memoInput.value = '';
        }
    });

    memoList.addEventListener('click', async function (e) {
        if (e.target.classList.contains('delete-button')) {
            const memoId = e.target.dataset.id;
            await deleteMemo(memoId);
        }
    });

    async function addMemo(text) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/memos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json, charset=UTF-8',
                },
                body: JSON.stringify({content: text})
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            await loadMemos();
        } catch (error) {
            showError('메모 추가 중 오류가 발생했습니다: ' + error.message);
        }
    }

    function renderMemos(memos) {
        memoList.innerHTML = memos.map(memo => `
            <div>
                <p>${memo.content}</p>
                <button class="delete-button" data-id="${memo.id}">삭제</button>
            </div>
        `).join('');
    }

    async function loadMemos() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/memos`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            if (!text) {
                return renderMemos([]);
            }
            const data = JSON.parse(text);
            renderMemos(data);
        } catch (error) {
            showError('메모 로딩 중 오류가 발생했습니다: ' + error.message);
        }
    }

    async function deleteMemo(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/memos/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            await loadMemos();
        } catch (error) {
            showError('메모 삭제 중 오류가 발생했습니다: ' + error.message);
        }
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }

    // 페이지 로드 시 메모 불러오기
    loadMemos();
});