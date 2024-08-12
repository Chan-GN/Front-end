// ui.js
export function renderMemos(memos, memoList) {
    memoList.innerHTML = memos.map(memo => `
        <div>
            <p>${memo.content}</p>
            <button class="delete-button" data-id="${memo.id}">삭제</button>
        </div>
    `).join('');
}

export function showError(message, errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 5000);
}
