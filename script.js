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
    
    // Share functionality using Web Share API
    shareBtn.addEventListener('click', function() {
        // First check if the browser supports the Web Share API
        if (navigator.share) {
            // Use html2canvas to capture the card
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
                scale: 8, // Better quality
                logging: false,
                allowTaint: true,
                useCORS: true
            }).then(canvas => {
                // Remove the loading message
                document.body.removeChild(loadingMessage);
                
                // Convert canvas to blob
                canvas.toBlob(async function(blob) {
                    // Create a File object
                    const file = new File([blob], 'eid-mubarak-card.png', { type: 'image/jpeg' });
                    
                    try {
                        // Share the file
                        await navigator.share({
                            title: 'ঈদ মুবারক',
                            text: 'আমার তৈরি করা ঈদ কার্ড দেখুন!',
                            files: [file]
                        });
                        console.log('Card shared successfully');
                    } catch (error) {
                        // If file sharing fails, try without file (some devices don't support file sharing)
                        if (error.name !== 'AbortError') {
                            try {
                                await navigator.share({
                                    title: 'ঈদ মুবারক',
                                    text: 'আমার তৈরি করা ঈদ কার্ড দেখুন!'
                                });
                                console.log('Card shared successfully (without file)');
                            } catch (fallbackError) {
                                if (fallbackError.name !== 'AbortError') {
                                    alert('শেয়ার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
                                    console.error('Share error:', fallbackError);
                                }
                            }
                        }
                    }
                }, 'image/jpeg');
            }).catch(error => {
                // Remove the loading message
                document.body.removeChild(loadingMessage);
                
                // Show error message
                alert('দুঃখিত, শেয়ার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
                console.error('html2canvas error:', error);
            });
        } else {
            // Web Share API is not supported
            alert('দুঃখিত, আপনার ব্রাউজারে শেয়ার ফিচার সমর্থিত নয়। অন্য উপায়ে চেষ্টা করুন।');
        }
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


document.addEventListener('DOMContentLoaded', function () {
    const qrCodeBtn = document.getElementById('qrCodeBtn');
    const qrModal = document.getElementById('qrModal');
    const closeQRBtn = document.getElementById('closeQRBtn');
    const downloadQRBtn = document.getElementById('downloadQRBtn');
    const qrcodeContainer = document.getElementById('qrcode');
    const cardPreview = document.querySelector('.card-preview');

    // QR কোড জেনারেট করার জন্য ইভেন্ট লিসেনার
    qrCodeBtn.addEventListener('click', function () {
        if (!cardPreview) {
            alert('কার্ড প্রিভিউ লোড করা যায়নি।');
            console.error('Card preview element not found.');
            return;
        }

        // html2canvas ব্যবহার করে কার্ডের ইমেজ তৈরি করুন
        html2canvas(cardPreview, {
            backgroundColor: null,
            scale: 2,
            logging: false,
            allowTaint: true,
            useCORS: true
        }).then(canvas => {
            // কার্ডের ইমেজ URL তৈরি করুন
            const cardImageURL = canvas.toDataURL('image/png');

            // QR কোড জেনারেট করুন
            if (!qrcodeContainer) {
                alert('QR কোড কন্টেইনার পাওয়া যায়নি।');
                console.error('QR code container element not found.');
                return;
            }

            qrcodeContainer.innerHTML = ''; // আগের QR কোড মুছে ফেলুন
            new QRCode(qrcodeContainer, {
                text: cardImageURL,
                width: 200,
                height: 200
            });

            // QR কোড মডাল দেখান
            qrModal.style.display = 'flex';
        }).catch(error => {
            alert('QR কোড জেনারেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
            console.error('QR Code Error:', error);
        });
    });

    // QR কোড মডাল বন্ধ করার জন্য ইভেন্ট লিসেনার
    closeQRBtn.addEventListener('click', function () {
        qrModal.style.display = 'none';
    });

    // QR কোড ডাউনলোড করার জন্য ইভেন্ট লিসেনার
    downloadQRBtn.addEventListener('click', function () {
        const qrCanvas = qrcodeContainer.querySelector('canvas');
        if (qrCanvas) {
            const link = document.createElement('a');
            link.href = qrCanvas.toDataURL('image/png');
            link.download = 'eid-mubarak-qr-code.png';
            link.click();
        } else {
            alert('QR কোড ডাউনলোড করতে সমস্যা হয়েছে।');
        }
    });
});