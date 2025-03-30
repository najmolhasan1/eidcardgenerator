// টেমপ্লেট নির্বাচন করার ফাংশন
document.querySelectorAll('.template-option').forEach(option => {
    option.addEventListener('click', function() {
      // পুরানো সিলেক্টেড ক্লাস মুছে ফেলা
      document.querySelectorAll('.template-option').forEach(opt => opt.classList.remove('selected'));
      // নতুন সিলেক্টেড ক্লাস যোগ করা
      this.classList.add('selected');
      // ইমেজ আপডেট করা
      const selectedTemplate = this.getAttribute('data-url');
      document.getElementById('card-image').src = selectedTemplate;
    });
  });
  
  // কার্ড আপডেট করার ফাংশন
  function updateCard() {
    const userNote = document.getElementById('user-note-input').value;
    const userName = document.getElementById('user-name-input').value;
    const recipientName = document.getElementById('recipient-name-input').value;
  
    document.getElementById('user-note').innerText = userNote || 'আপনার নোট এখানে';
    document.getElementById('user-name').innerText = userName || 'আপনার নাম';
    document.getElementById('recipient-name').innerText = recipientName || 'প্রাপকের নাম';
  }
  
  // কার্ড ডাউনলোড করার ফাংশন
  function downloadCard() {
    html2canvas(document.getElementById('card-preview')).then(canvas => {
      const link = document.createElement('a');
      link.download = 'eid-card.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  }
  
  // কার্ড শেয়ার করার ফাংশন
  function shareCard() {
    html2canvas(document.getElementById('card-preview')).then(canvas => {
      canvas.toBlob(async (blob) => {
        const file = new File([blob], 'eid-card.png', { type: 'image/png' });
        const shareData = {
          title: 'ঈদ মোবারক কার্ড',
          text: 'আমার তৈরি ঈদ কার্ডটি দেখুন!',
          files: [file],
        };
  
        try {
          await navigator.share(shareData);
        } catch (err) {
          alert('শেয়ার করতে সমস্যা হয়েছে। দয়া করে ম্যানুয়ালি শেয়ার করুন।');
          console.error('Share failed:', err);
        }
      });
    });
  }
  
  // QR কোড তৈরি করার ফাংশন
  function generateQRCode() {
    const qrCodeDiv = document.getElementById('qr-code');
    qrCodeDiv.innerHTML = ''; // পুরানো QR কোড মুছে ফেলা
    qrCodeDiv.style.display = 'block';
  
    html2canvas(document.getElementById('card-preview')).then(canvas => {
      const imageUrl = canvas.toDataURL('image/png');
      new QRCode(qrCodeDiv, {
        text: imageUrl,
        width: 150,
        height: 150,
      });
    });
  }