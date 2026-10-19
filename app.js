const dialog=document.querySelector('#orderDialog');
const form=document.querySelector('#orderForm');
const products=['포근한 안녕 · 45,000원','너를 기억해 · 49,000원','햇살이 머무는 곳 · 55,000원'];
const dateInput=document.querySelector('#deliveryDate');
const today=new Date();
dateInput.min=[today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');
function openOrder(index=0){document.querySelector('#productSelect').value=index;document.querySelector('#orderContent').hidden=false;document.querySelector('#orderResult').hidden=true;dialog.showModal();dialog.scrollTop=0;document.body.classList.add('modal-open');}
function closeOrder(){dialog.close();}
document.querySelectorAll('[data-order]').forEach(button=>button.addEventListener('click',()=>openOrder()));
document.querySelectorAll('[data-product]').forEach(button=>button.addEventListener('click',()=>openOrder(Number(button.dataset.product))));
document.querySelector('.close').addEventListener('click',closeOrder);
document.querySelector('.close-result').addEventListener('click',closeOrder);
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');form.reset();updatePreview();});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeOrder();}});
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});document.querySelectorAll('.product').forEach(card=>card.hidden=button.dataset.filter!=='all'&&card.dataset.type!==button.dataset.filter);}));
function updatePreview(){document.querySelector('#previewPet').textContent=form.elements.pet.value.trim()||'소중한 너에게';document.querySelector('#previewMessage').textContent=form.elements.message.value.trim()||'당신의 마음이 이곳에 담겨요.';document.querySelector('#previewSender').textContent=form.elements.sender.value.trim()||'마음을 전하는 사람';}
form.addEventListener('input',updatePreview);
document.querySelectorAll('[data-message]').forEach(button=>button.addEventListener('click',()=>{form.elements.message.value=button.dataset.message;updatePreview();}));
form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;if(dateInput.value<dateInput.min){dateInput.setCustomValidity('오늘 이후의 날짜를 선택해 주세요.');dateInput.reportValidity();return;}const data=new FormData(form);const summary=document.querySelector('#summary');summary.replaceChildren();const rows=[['선택한 꽃',products[Number(data.get('product'))]],['보내는 분',data.get('sender')],['기억하는 아이 · 받는 분',`${data.get('pet')} · ${data.get('recipient')}`],['받을 곳',`${data.get('venue')}\n${data.get('address')}`],['희망 수령 일정',`${data.get('date')} ${data.get('time')}`],['추모 메시지',data.get('message')]];for(const [title,value]of rows){const dt=document.createElement('dt');dt.textContent=title;const dd=document.createElement('dd');dd.textContent=value;summary.append(dt,dd);}document.querySelector('#orderContent').hidden=true;document.querySelector('#orderResult').hidden=false;dialog.scrollTop=0;document.querySelector('.close-result').focus();});
dateInput.addEventListener('input',()=>dateInput.setCustomValidity(''));
