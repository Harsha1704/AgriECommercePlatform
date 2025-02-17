document.addEventListener('DOMContentLoaded', function() {
    const trackingSteps = document.querySelectorAll('.tracking-progress .step');
    const updateMessages = document.querySelector('.update-messages');

    
    let currentStep = 0;
    const trackingInterval = setInterval(() => {
        if (currentStep < trackingSteps.length) {
            trackingSteps[currentStep].classList.add('completed');
            
            const message = document.createElement('div');
            message.className = 'update-message';
            message.textContent = getUpdateMessage(currentStep);
            updateMessages.appendChild(message);
            
     
            updateMessages.scrollTop = updateMessages.scrollHeight;
            
            currentStep++;
        } else {
            clearInterval(trackingInterval);
        }
    }, 3000); 

    function getUpdateMessage(step) {
        const messages = [
            'Your order has been placed successfully.',
            'Your order is being processed.',
            'Your order has been shipped.',
            'Your order is out for delivery.',
            'Your order has been delivered!'
        ];
        return messages[step];
    }

   
    const liveUpdates = [
        'Farmer has confirmed your order.',
        'Your produce is being harvested.',
        'Your order is being packed.',
        'Your order is on its way!'
    ];

    let updateIndex = 0;
    setInterval(() => {
        if (updateIndex < liveUpdates.length) {
            const message = document.createElement('div');
            message.className = 'update-message';
            message.textContent = liveUpdates[updateIndex];
            updateMessages.appendChild(message);
            
            
            updateMessages.scrollTop = updateMessages.scrollHeight;
            
            updateIndex++;
        }
    }, 5000); 
});
