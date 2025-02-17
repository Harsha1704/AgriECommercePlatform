
document.addEventListener('DOMContentLoaded', function() {
    const discussionThreads = document.querySelector('.discussion-threads');
    const newDiscussionInput = document.querySelector('.new-discussion input');
    const postButton = document.querySelector('.new-discussion button');

   
    const initialDiscussions = [
        "What are the best organic vegetables this season?",
        "Looking for recommendations for fresh dairy products",
        "How to identify truly organic produce?",
        "Best practices for storing fresh produce"
    ];

    initialDiscussions.forEach(discussion => {
        const thread = document.createElement('div');
        thread.className = 'discussion-thread';
        thread.textContent = discussion;
        discussionThreads.appendChild(thread);
    });


    postButton.addEventListener('click', function() {
        const newDiscussion = newDiscussionInput.value.trim();
        if (newDiscussion) {
            const thread = document.createElement('div');
            thread.className = 'discussion-thread';
            thread.textContent = newDiscussion;
            discussionThreads.appendChild(thread);
            newDiscussionInput.value = '';
            
            
            discussionThreads.scrollTop = discussionThreads.scrollHeight;
        }
    });


    newDiscussionInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            postButton.click();
        }
    });
});
