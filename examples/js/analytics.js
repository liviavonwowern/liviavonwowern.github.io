// dataLayer helper function
function pushToDataLayer(event, data) {
    window.dataLayer.push({
        event: event,
        ...data,
        timestamp: new Date().toISOString()
    });
    
    // Log to console for demonstration purposes
    console.log('dataLayer Push:', {
        event: event,
        ...data,
        timestamp: new Date().toISOString()
    });
}

// Page view tracking
document.addEventListener('DOMContentLoaded', function() {
    pushToDataLayer('page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
    });
    
    // Track navigation clicks
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent actual navigation for demo
            
            pushToDataLayer('navigation_click', {
                link_id: this.id,
                link_text: this.textContent,
                link_url: this.href
            });
        });
    });
    
    // Track CTA button clicks
    document.getElementById('cta-button').addEventListener('click', function() {
        pushToDataLayer('cta_click', {
            button_id: 'cta-button',
            button_text: this.textContent
        });
    });
    
    // Track product interactions
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.product');
            
            pushToDataLayer('add_to_cart', {
                product_id: product.dataset.productId,
                product_name: product.dataset.productName,
                product_price: parseFloat(product.dataset.productPrice),
                currency: 'USD'
            });
        });
    });
});

// Example of how to access dataLayer data
window.showDataLayerHistory = function() {
    console.table(window.dataLayer);
};