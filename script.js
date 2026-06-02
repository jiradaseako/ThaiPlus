function calculate() {
  const balanceInput = document.getElementById('balance');
  const balance = parseFloat(balanceInput.value);

  // ตรวจสอบ input
  if (!balanceInput.value || isNaN(balance) || balance < 0) {
    alert('กรุณากรอกยอดคงเหลือให้ถูกต้อง');
    balanceInput.focus();
    return;
  }

  // คำนวณ: (40/60 * ยอดคงเหลือ) + ยอดคงเหลือ
  const usableAmount = (40 / 60 * balance) + balance;

  // คำนวณ: ต้องเติมเงิน = 40/60 * ยอดคงเหลือ
  const needAmount = (40 / 60) * balance;

  // แสดงผลลัพธ์
  document.getElementById('result').textContent = usableAmount.toFixed(2);
  document.getElementById('detailBalance').textContent = balance.toFixed(2);
  document.getElementById('detailNeed').textContent = needAmount.toFixed(2);
  document.getElementById('resultSection').style.display = 'block';

  // Scroll to result
  setTimeout(() => {
    document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

function clearForm() {
  document.getElementById('balance').value = '';
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

  // Auto focus ที่ input
  document.getElementById('balance').focus();
});
