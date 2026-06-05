function calculate() {
  const balanceInput = document.getElementById('balance');
  const priceInput = document.getElementById('price');
  const balance = parseFloat(balanceInput.value);
  const price = priceInput.value ? parseFloat(priceInput.value) : null;

  // ตรวจสอบ input: สิทธิคงเหลือจำเป็น
  if (!balanceInput.value || isNaN(balance) || balance < 0) {
    alert('กรุณากรอกสิทธิคงเหลือให้ถูกต้อง');
    balanceInput.focus();
    return;
  }

  // ตรวจสอบ input: ราคาถ้ามี
  if (priceInput.value && (isNaN(price) || price < 0)) {
    alert('กรุณากรอกราคาให้ถูกต้อง');
    priceInput.focus();
    return;
  }

  // คำนวณ: ช่วยจ่ายได้สูงสุด 200 บาท
  const help = Math.min((40 / 60) * balance, 200);

  // คำนวณ: ยอดใช้ได้ = สิทธิคงเหลือ + ช่วยจ่าย
  const usableAmount = balance + help;

  // คำนวณ: ต้องเติมเงิน = ช่วยจ่าย
  let needAmount = help;

  // แสดงผลลัพธ์พื้นฐาน
  document.getElementById('result').textContent = usableAmount.toFixed(2);
  document.getElementById('detailBalance').textContent = balance.toFixed(2);

  // ถ้ามีการกรอกราคา ให้คำนวณเพิ่มเติม
  if (price !== null) {
    document.getElementById('priceRow').style.display = 'flex';
    document.getElementById('detailPrice').textContent = price.toFixed(2);

    if (usableAmount < price) {
      // สิทธิคงเหลือไม่พอ
      const shortfall = price - usableAmount;
      needAmount = needAmount + shortfall;

      document.getElementById('statusRow').style.display = 'flex';
      document.getElementById('statusText').textContent = '⚠️ สิทธิคงเหลือไม่พอ';
      document.getElementById('statusValue').textContent = '';
      document.getElementById('statusRow').style.borderBottom = '2px solid #E74C3C';
    } else {
      // สิทธิคงเหลือพอ
      document.getElementById('statusRow').style.display = 'flex';
      document.getElementById('statusText').textContent = '✓ สิทธิคงเหลือพอ';
      document.getElementById('statusValue').textContent = '';
      document.getElementById('statusRow').style.borderBottom = '2px solid #27AE60';
    }
  } else {
    document.getElementById('priceRow').style.display = 'none';
    document.getElementById('statusRow').style.display = 'none';
  }

  document.getElementById('detailNeed').textContent = needAmount.toFixed(2);
  document.getElementById('resultSection').style.display = 'block';

  // Scroll to result
  setTimeout(() => {
    document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

function clearForm() {
  document.getElementById('balance').value = '';
  document.getElementById('price').value = '';
  document.getElementById('resultSection').style.display = 'none';
  document.getElementById('balance').focus();
}

// รองรับการกด Enter
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('balance').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      calculate();
    }
  });

  document.getElementById('price').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      calculate();
    }
  });

  // Auto focus ที่ input
  document.getElementById('balance').focus();
});
