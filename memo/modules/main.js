// main.js
import {addMemo, deleteMemo, loadMemos} from './api.js';
import {renderMemos, showError} from './ui.js';

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
            try {
                await addMemo(memoText);
                memoInput.value = '';
                await refreshMemos();
            } catch (error) {
                showError(`메모 추가 중 오류가 발생했습니다: ${error.message}`, errorMessage);
            }
        }
    });

    memoList.addEventListener('click', async function (e) {
        if (e.target.classList.contains('delete-button')) {
            const memoId = e.target.dataset.id;
            try {
                await deleteMemo(memoId);
                await refreshMemos();
            } catch (error) {
                showError(`메모 삭제 중 오류가 발생했습니다: ${error.message}`, errorMessage);
            }
        }
    });

    async function refreshMemos() {
        try {
            const memos = await loadMemos();
            renderMemos(memos, memoList);
        } catch (error) {
            showError(`메모 로딩 중 오류가 발생했습니다: ${error.message}`, errorMessage);
        }
    }

    // 페이지 로드 시 메모 불러오기
    refreshMemos();
});