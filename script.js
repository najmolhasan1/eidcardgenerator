      document.addEventListener('DOMContentLoaded', function() {
    const cardPreview = document.querySelector('.card-preview');
    const cardMessage = document.querySelector('.card-message');
    const cardName = document.querySelector('.card-name');
    const messageInput = document.getElementById('message');
    const nameInput = document.getElementById('name');
    const templates = document.querySelectorAll('.template');
    const showMoonCheckbox = document.getElementById('showMoon');
    const showIllustrationCheckbox = document.getElementById('showIllustration');
    const downloadBtn = document.getElementById('downloadBtn');
    const shareBtn = document.getElementById('shareBtn');
    const cardMoon = document.querySelector('.card-moon');
    const cardIllustration = document.querySelector('.card-illustration');

    // document.addEventListener('DOMContentLoaded', function() {...} ব্লকের ভিতরে
// সকল ভেরিয়েবল ডিক্লেয়ারেশনের পরে এই কোড যোগ করুন:

    // কালার পরিবর্তন ফিচার
    const messageColorInput = document.getElementById('messageColor');
    const nameColorInput = document.getElementById('nameColor');
    const borderColorInput = document.getElementById('borderColor');
    const eidTextColorInput = document.getElementById('eidTextColor');
    const cardTitle = document.querySelector('.card-title'); // ঈদ মোবারক টাইটেল

    // বার্তার কালার পরিবর্তন
    messageColorInput.addEventListener('input', function() {
        cardMessage.style.color = this.value;
    });

    // নামের কালার পরিবর্তন
    nameColorInput.addEventListener('input', function() {
        cardName.style.color = this.value;
    });

    // প্রোফাইল ইমেজের বর্ডার কালার পরিবর্তন
    borderColorInput.addEventListener('input', function() {
        if (userImageContainer) {
            userImageContainer.style.borderColor = this.value;
        }
    });

    // ঈদ মোবারক লেখার কালার পরিবর্তন
    eidTextColorInput.addEventListener('input', function() {
        cardTitle.style.color = this.value;
    });


    // নতুন এলিমেন্টস
    const userImageInput = document.getElementById('userImage');
    const useUserImageCheckbox = document.getElementById('useUserImage');
    let userImageContainer = null;
    let userImageElement = null;

    // Download functionality using html2canvas
    downloadBtn.addEventListener('click', function() {
        // Show a loading message
        const loadingMessage = document.createElement('div');
        loadingMessage.textContent = 'আপনার কার্ড ডাউনলোড হচ্ছে...';
        loadingMessage.style.position = 'fixed';
        loadingMessage.style.top = '50%';
        loadingMessage.style.left = '50%';
        loadingMessage.style.transform = 'translate(-50%, -50%)';
        loadingMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        loadingMessage.style.color = 'white';
        loadingMessage.style.padding = '15px 20px';
        loadingMessage.style.borderRadius = '5px';
        loadingMessage.style.zIndex = '1000';
        document.body.appendChild(loadingMessage);
        
        // Use setTimeout to allow the loading message to render
        setTimeout(() => {
            // Use html2canvas to capture the card
            html2canvas(cardPreview, {
                backgroundColor: null,
                scale: 8, // Better quality
                logging: false,
                allowTaint: true,
                useCORS: true
            }).then(canvas => {
                // Remove the loading message
                document.body.removeChild(loadingMessage);
                
                // Convert canvas to blob
                canvas.toBlob(function(blob) {
                    // Create a temporary link element
                    const link = document.createElement('a');
                    link.download = 'eid-mubarak-card.png';
                    
                    // Create a URL for the blob
                    link.href = URL.createObjectURL(blob);
                    
                    // Append to the document and trigger the download
                    document.body.appendChild(link);
                    link.click();
                    
                    // Clean up
                    document.body.removeChild(link);
                    URL.revokeObjectURL(link.href);
                }, 'image/jpeg');
            }).catch(error => {
                // Remove the loading message
                document.body.removeChild(loadingMessage);
                
                // Show error message
                alert('দুঃখিত, ডাউনলোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
                console.error('html2canvas error:', error);
            });
        }, 100);
    });
    
      // Modify the share button functionality to work on all devices including mobile
shareBtn.addEventListener('click', function() {
    // First capture the card as an image
    const loadingMessage = document.createElement('div');
    loadingMessage.textContent = 'আপনার কার্ড শেয়ার করার জন্য প্রস্তুত করা হচ্ছে...';
    loadingMessage.style.position = 'fixed';
    loadingMessage.style.top = '50%';
    loadingMessage.style.left = '50%';
    loadingMessage.style.transform = 'translate(-50%, -50%)';
    loadingMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    loadingMessage.style.color = 'white';
    loadingMessage.style.padding = '15px 20px';
    loadingMessage.style.borderRadius = '5px';
    loadingMessage.style.zIndex = '1000';
    document.body.appendChild(loadingMessage);
    
    html2canvas(cardPreview, {
        backgroundColor: null,
        scale: 4, // Good quality but not too large
        logging: false,
        allowTaint: true,
        useCORS: true
    }).then(canvas => {
        // Convert canvas to blob
        canvas.toBlob(function(blob) {
            // Create a FormData object to send the image to the server
            const formData = new FormData();
            formData.append('image', blob, 'eid-mubarak-card.jpg');
            
            // Upload to ImgBB
            fetch('https://api.imgbb.com/1/upload?key=ce97b288a4d204bbbb7b2f637eee72e2', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Remove the loading message
                document.body.removeChild(loadingMessage);
                
                if (data.success) {
                    // Get the shareable URL (direct display URL is better for sharing)
                    const shareableURL = data.data.display_url || data.data.url;
                    
                    // Create a modal to show sharing options
                    const shareModal = document.createElement('div');
                    shareModal.style.position = 'fixed';
                    shareModal.style.top = '0';
                    shareModal.style.left = '0';
                    shareModal.style.width = '100%';
                    shareModal.style.height = '100%';
                    shareModal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                    shareModal.style.zIndex = '1000';
                    shareModal.style.display = 'flex';
                    shareModal.style.flexDirection = 'column';
                    shareModal.style.justifyContent = 'center';
                    shareModal.style.alignItems = 'center';
                    shareModal.style.padding = '20px';
                    
                    // Create modal content
                    const modalContent = document.createElement('div');
                    modalContent.style.backgroundColor = 'white';
                    modalContent.style.borderRadius = '10px';
                    modalContent.style.padding = '20px';
                    modalContent.style.maxWidth = '90%';
                    modalContent.style.width = '350px';
                    modalContent.style.maxHeight = '90vh';
                    modalContent.style.overflowY = 'auto';
                    modalContent.style.display = 'flex';
                    modalContent.style.flexDirection = 'column';
                    modalContent.style.gap = '15px';
                    
                    // Create modal title
                    const modalTitle = document.createElement('h3');
                    modalTitle.textContent = 'আপনার কার্ড শেয়ার করুন';
                    modalTitle.style.textAlign = 'center';
                    modalTitle.style.margin = '0 0 15px 0';
                    modalContent.appendChild(modalTitle);
                    
                    // Create URL display
                    const urlDisplay = document.createElement('div');
                    urlDisplay.style.padding = '10px';
                    urlDisplay.style.backgroundColor = '#f0f0f0';
                    urlDisplay.style.borderRadius = '5px';
                    urlDisplay.style.wordBreak = 'break-all';
                    urlDisplay.style.fontSize = '14px';
                    urlDisplay.textContent = shareableURL;
                    modalContent.appendChild(urlDisplay);
                    
                    // Copy button
                    const copyBtn = document.createElement('button');
                    copyBtn.textContent = 'লিংক কপি করুন';
                    copyBtn.style.padding = '10px 15px';
                    copyBtn.style.backgroundColor = '#4CAF50';
                    copyBtn.style.color = 'white';
                    copyBtn.style.border = 'none';
                    copyBtn.style.borderRadius = '5px';
                    copyBtn.style.cursor = 'pointer';
                    copyBtn.style.width = '100%';
                    copyBtn.onclick = function() {
                        // Create a temporary input for copying
                        const tempInput = document.createElement('input');
                        tempInput.value = shareableURL;
                        document.body.appendChild(tempInput);
                        tempInput.select();
                        document.execCommand('copy');
                        document.body.removeChild(tempInput);
                        
                        copyBtn.textContent = 'কপি হয়েছে!';
                        setTimeout(() => {
                            copyBtn.textContent = 'লিংক কপি করুন';
                        }, 2000);
                    };
                    modalContent.appendChild(copyBtn);
                    
                    // Create web share button (only for supported devices)
                    if (navigator.share) {
                        const webShareBtn = document.createElement('button');
                        webShareBtn.textContent = 'ডিভাইস শেয়ার ব্যবহার করুন';
                        webShareBtn.style.padding = '10px 15px';
                        webShareBtn.style.backgroundColor = '#2196F3';
                        webShareBtn.style.color = 'white';
                        webShareBtn.style.border = 'none';
                        webShareBtn.style.borderRadius = '5px';
                        webShareBtn.style.cursor = 'pointer';
                        webShareBtn.style.width = '100%';
                        webShareBtn.onclick = function() {
                            navigator.share({
                                title: 'ঈদ মুবারক',
                                text: 'আমার তৈরি করা ঈদ কার্ড দেখুন!',
                                url: shareableURL
                            }).catch(err => {
                                console.log('Sharing failed', err);
                            });
                        };
                        modalContent.appendChild(webShareBtn);
                    }
                    
                    // Social sharing buttons
                    const socialBtns = document.createElement('div');
                    socialBtns.style.display = 'flex';
                    socialBtns.style.justifyContent = 'space-between';
                    socialBtns.style.gap = '10px';
                    
                    // Create Facebook share button
                    const fbBtn = document.createElement('button');
                    fbBtn.textContent = 'ফেসবুকে শেয়ার';
                    fbBtn.style.flex = '1';
                    fbBtn.style.padding = '10px 5px';
                    fbBtn.style.backgroundColor = '#3b5998';
                    fbBtn.style.color = 'white';
                    fbBtn.style.border = 'none';
                    fbBtn.style.borderRadius = '5px';
                    fbBtn.style.cursor = 'pointer';
                    fbBtn.onclick = function() {
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableURL)}`, '_blank');
                    };
                    socialBtns.appendChild(fbBtn);
                    
                    // Create WhatsApp share button
                    const waBtn = document.createElement('button');
                    waBtn.textContent = 'হোয়াটসঅ্যাপে শেয়ার';
                    waBtn.style.flex = '1';
                    waBtn.style.padding = '10px 5px';
                    waBtn.style.backgroundColor = '#25D366';
                    waBtn.style.color = 'white';
                    waBtn.style.border = 'none';
                    waBtn.style.borderRadius = '5px';
                    waBtn.style.cursor = 'pointer';
                    waBtn.onclick = function() {
                        window.open(`https://wa.me/?text=${encodeURIComponent('ঈদ মুবারক! ' + shareableURL)}`, '_blank');
                    };
                    socialBtns.appendChild(waBtn);
                    
                    modalContent.appendChild(socialBtns);
                    
                    // Close button
                    const closeBtn = document.createElement('button');
                    closeBtn.textContent = 'বন্ধ করুন';
                    closeBtn.style.padding = '10px 15px';
                    closeBtn.style.backgroundColor = '#f44336';
                    closeBtn.style.color = 'white';
                    closeBtn.style.border = 'none';
                    closeBtn.style.borderRadius = '5px';
                    closeBtn.style.cursor = 'pointer';
                    closeBtn.style.marginTop = '10px';
                    closeBtn.style.width = '100%';
                    closeBtn.onclick = function() {
                        document.body.removeChild(shareModal);
                    };
                    modalContent.appendChild(closeBtn);
                    
                    // Add modal content to modal
                    shareModal.appendChild(modalContent);
                    
                    // Add modal to body
                    document.body.appendChild(shareModal);
                    
                    // Also close modal when clicking outside
                    shareModal.addEventListener('click', function(e) {
                        if (e.target === shareModal) {
                            document.body.removeChild(shareModal);
                        }
                    });
                } else {
                    alert('ইমেজ আপলোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
                    console.error('Image upload error:', data);
                }
            })
            .catch(error => {
                // Remove the loading message
                document.body.removeChild(loadingMessage);
                
                // Show error message
                alert('দুঃখিত, ইমেজ আপলোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
                console.error('Image upload error:', error);
            });
        }, 'image/jpeg', 0.85);
    }).catch(error => {
        // Remove the loading message
        document.body.removeChild(loadingMessage);
        
        // Show error message
        alert('দুঃখিত, কার্ড ক্যাপচার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
        console.error('html2canvas error:', error);
    });
});

// Modify the QR Code button functionality to generate and download a QR code of the image URL
qrCodeBtn.addEventListener('click', function() {
    if (!cardPreview) {
        alert('কার্ড প্রিভিউ লোড করা যায়নি।');
        console.error('Card preview element not found.');
        return;
    }

    // Show loading message
    const loadingMessage = document.createElement('div');
    loadingMessage.textContent = 'QR কোড তৈরি করা হচ্ছে...';
    loadingMessage.style.position = 'fixed';
    loadingMessage.style.top = '50%';
    loadingMessage.style.left = '50%';
    loadingMessage.style.transform = 'translate(-50%, -50%)';
    loadingMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    loadingMessage.style.color = 'white';
    loadingMessage.style.padding = '15px 20px';
    loadingMessage.style.borderRadius = '5px';
    loadingMessage.style.zIndex = '1000';
    document.body.appendChild(loadingMessage);

    // Generate the card image
    html2canvas(cardPreview, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        allowTaint: true,
        useCORS: true
    }).then(canvas => {
        // Convert canvas to blob
        canvas.toBlob(function(blob) {
            // Create a FormData object to send the image to the server
            const formData = new FormData();
            formData.append('image', blob, 'eid-mubarak-card.jpg');
            
            // Upload to ImgBB
            fetch('https://api.imgbb.com/1/upload?key=ce97b288a4d204bbbb7b2f637eee72e2', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Get the shareable URL (direct display URL is better for sharing)
                    const shareableURL = data.data.display_url || data.data.url;
                    
                    // Create a container for QR code (off-screen)
                    const qrContainer = document.createElement('div');
                    qrContainer.style.position = 'absolute';
                    qrContainer.style.left = '-9999px';
                    qrContainer.style.top = '-9999px';
                    document.body.appendChild(qrContainer);
                    
                    // Generate QR code
                    try {
                        new QRCode(qrContainer, {
                            text: shareableURL,
                            width: 256,
                            height: 256,
                            colorDark: "#000000",
                            colorLight: "#ffffff",
                            correctLevel: QRCode.CorrectLevel.H
                        });
                        
                        // Wait a bit for QR code to render
                        setTimeout(() => {
                            // Find the canvas in the QR code container
                            const qrCanvas = qrContainer.querySelector('canvas');
                            
                            if (qrCanvas) {
                                // Convert to downloadable image
                                const qrImageURL = qrCanvas.toDataURL('image/png');
                                
                                // Create download link
                                const downloadLink = document.createElement('a');
                                downloadLink.href = qrImageURL;
                                downloadLink.download = 'eid-mubarak-qr-code.png';
                                document.body.appendChild(downloadLink);
                                
                                // Trigger download
                                downloadLink.click();
                                
                                // Cleanup
                                document.body.removeChild(downloadLink);
                                document.body.removeChild(qrContainer);
                                document.body.removeChild(loadingMessage);
                                
                                // Show success message
                                const successMsg = document.createElement('div');
                                successMsg.textContent = 'QR কোড ডাউনলোড হয়েছে!';
                                successMsg.style.position = 'fixed';
                                successMsg.style.top = '50%';
                                successMsg.style.left = '50%';
                                successMsg.style.transform = 'translate(-50%, -50%)';
                                successMsg.style.backgroundColor = 'rgba(0, 128, 0, 0.8)';
                                successMsg.style.color = 'white';
                                successMsg.style.padding = '15px 20px';
                                successMsg.style.borderRadius = '5px';
                                successMsg.style.zIndex = '1000';
                                document.body.appendChild(successMsg);
                                
                                // Remove success message after 2 seconds
                                setTimeout(() => {
                                    document.body.removeChild(successMsg);
                                }, 2000);
                            } else {
                                throw new Error('QR canvas not found');
                            }
                        }, 500); // Give time for QR code to render
                    } catch (qrError) {
                        // Remove loading message
                        document.body.removeChild(loadingMessage);
                        if (qrContainer && document.body.contains(qrContainer)) {
                            document.body.removeChild(qrContainer);
                        }
                        
                        console.error('QR generation error:', qrError);
                        alert('QR কোড তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
                    }
                } else {
                    // Remove loading message
                    document.body.removeChild(loadingMessage);
                    console.error('Image upload error:', data);
                    alert('ইমেজ আপলোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
                }
            })
            .catch(error => {
                // Remove loading message
                document.body.removeChild(loadingMessage);
                console.error('Upload error:', error);
                alert('ইমেজ আপলোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
            });
        }, 'image/jpeg', 0.85);
    }).catch(error => {
        // Remove loading message
        document.body.removeChild(loadingMessage);
        console.error('html2canvas error:', error);
        alert('কার্ড ক্যাপচার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    });
});

    // ইউজার ইমেজ আপলোড হ্যান্ডেলিং
    userImageInput.addEventListener('change', function(e) {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // ইউজার ইমেজ এলিমেন্ট তৈরি করুন যদি নেই
            if (!userImageContainer) {
                userImageContainer = document.createElement('div');
                userImageContainer.className = 'user-image-container';
                
                userImageElement = document.createElement('img');
                userImageContainer.appendChild(userImageElement);
                
                // যদি ইলাস্ট্রেশন এলিমেন্ট থাকে, তাহলে তার পরে ইমেজ কন্টেইনার যোগ করুন
                if (cardIllustration) {
                    cardIllustration.after(userImageContainer);
                } else {
                    // না থাকলে টাইটেলের পরে যোগ করুন
                    const cardTitle = cardPreview.querySelector('.card-title');
                    cardTitle.after(userImageContainer);
                }
            }
            
            // ইমেজ সোর্স সেট করুন
            userImageElement.src = e.target.result;
            
            // চেকবক্স অটোমেটিক চেক করুন এবং ইমেজ দেখান
            useUserImageCheckbox.checked = true;
            userImageContainer.style.display = 'flex';
            
            // ইলাস্ট্রেশন লুকান
            if (cardIllustration) {
                cardIllustration.style.display = 'none';
            }
        };
        
        reader.readAsDataURL(e.target.files[0]);
    }
});
    
    // ইউজার ইমেজ টগল করুন
    useUserImageCheckbox.addEventListener('change', function() {
        if (this.checked && userImageContainer) {
            userImageContainer.style.display = 'flex';
            if (cardIllustration) {
                cardIllustration.style.display = 'none';
            }
        } else {
            if (userImageContainer) {
                userImageContainer.style.display = 'none';
            }
            if (cardIllustration && showIllustrationCheckbox.checked) {
                cardIllustration.style.display = 'block';
            }
        }
    });
    
    // Update message in real-time
    messageInput.addEventListener('input', function() {
        cardMessage.textContent = this.value;
    });
    
    // Update name in real-time
    nameInput.addEventListener('input', function() {
        cardName.textContent = '- ' + this.value;
    });
    
    // Template selection
    templates.forEach(template => {
        template.addEventListener('click', function() {
            // Remove active class from all templates
            templates.forEach(t => t.classList.remove('active'));

            // Add active class to the clicked template
            this.classList.add('active');

            // Update the card preview to the selected template
            const templateClass = this.getAttribute('data-template');
            cardPreview.className = 'card-preview ' + templateClass;
        });
    });

    // Toggle moon visibility
    showMoonCheckbox.addEventListener('change', function() {
        cardMoon.style.display = this.checked ? 'block' : 'none';
    });

    // Toggle illustration visibility
    showIllustrationCheckbox.addEventListener('change', function() {
        cardIllustration.style.display = this.checked ? 'block' : 'none';
        
        // যদি ইলাস্ট্রেশন হাইড করা হয় এবং ইউজার ইমেজ আছে, তাহলে ইউজার ইমেজ দেখান
        if (!this.checked && userImageContainer && useUserImageCheckbox.checked) {
            userImageContainer.style.display = 'flex';
        } 
        // যদি ইলাস্ট্রেশন শো করা হয় এবং ইউজার ইমেজও শো করা থাকে, তাহলে ইউজার ইমেজ হাইড করুন
        else if (this.checked && userImageContainer && userImageContainer.style.display !== 'none') {
            userImageContainer.style.display = 'none';
        }
    });
    
    
    // Initialize with default values
    cardMessage.textContent = messageInput.value;
    cardName.textContent = '- ' + nameInput.value;
    // কোডের শেষে "// Initialize with default values" কমেন্টের নিচে বা
// downloadBtn, shareBtn ইভেন্ট লিসেনার এর পরে যোগ করুন:

    // Initialize colors with default values
    cardMessage.style.color = messageColorInput.value;
    cardName.style.color = nameColorInput.value;
    if (userImageContainer) {
        userImageContainer.style.borderColor = borderColorInput.value;
    }
    cardTitle.style.color = eidTextColorInput.value;
});