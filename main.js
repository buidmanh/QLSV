const tableBodyElement = document.querySelector('#tbodySinhVien');
let currentCountSv = localStorage.getItem('msvCount') ? localStorage.getItem('msvCount') : 1;
const INPUT_TYPE = [
    {
        text: 'TEXT',
        number: 'NUMBER',
        select: 'select'
    }
]
let listSv = localStorage.getItem('listSv') ? JSON.parse(localStorage.getItem('listSv')) : [];
const tenSvElement = document.querySelector('#txtTenSV');
const maSvElement = document.querySelector('#txtMaSV');
const emailSvElement = document.querySelector('#txtEmail');
const passSvElement = document.querySelector('#txtPass');
const dobSvElement = document.querySelector('#txtNgaySinh');
const diemToanSvElement = document.querySelector('#txtDiemToan');
const diemLyElement = document.querySelector('#txtDiemLy');
const diemHoaElement = document.querySelector('#txtDiemHoa');
const courseElement = document.querySelector('#khSV')
let editID = '';
// const listSv = [
//     {
//         maSv: '001',
//         tenSv: 'manh',
//         email: '23@gmail.com',
//         pass: '123456',
//         ngaySinh: '23/6/555',
//         khoaHoc: '1',
//         diemToan: 10,
//         diemLy: 9,
//         diemHoa: 8
//     },
//     {
//         maSv: '002',
//         tenSv: 'manh',
//         email: '23@gmail.com',
//         pass: '123456',
//         ngaySinh: '23/6/555',
//         khoaHoc: '1',
//         diemToan: 10,
//         diemLy: 9,
//         diemHoa: 8
//     },
//     {
//         maSv: '003',
//         tenSv: 'manh',
//         email: '23@gmail.com',
//         pass: '123456',
//         ngaySinh: '23/6/555',
//         khoaHoc: '1',
//         diemToan: 10,
//         diemLy: 9,
//         diemHoa: 8
//     }
// ];

function buildSvTemplate(svObj) {
    const inputSv = document.querySelector('.inputSv');
    const templateSv = document.querySelector('.templateSv');
    const fragmentSv = templateSv.content.cloneNode(true);
    const ElementSv = fragmentSv.querySelector('.dataSv');
    const msvElement = ElementSv.querySelector('.msv');
    msvElement.innerText = svObj.maSv;
    const tsvElement = ElementSv.querySelector('.tsv');
    tsvElement.innerText = svObj.tenSv;
    const emailElement = ElementSv.querySelector('.email');
    emailElement.innerText = svObj.email;
    const courseElement = ElementSv.querySelector('.khoahoc');
    courseElement.innerText = svObj.khoaHoc === '1' ? 'KH001' : 'KH002';
    const dobElement = ElementSv.querySelector('.dob');
    dobElement.innerText = svObj.ngaySinh;
    const dtbElement = ElementSv.querySelector('.diemTB');
    const diemTrb = (svObj.diemToan + svObj.diemLy + svObj.diemHoa) / 3
    dtbElement.innerText = diemTrb.toFixed(2);

    // remove btn

    const removeBtn = ElementSv.querySelector('.remove-Btn');
    removeBtn.addEventListener('click', function () {
        // tim element dua tren id
        tableBodyElement.removeChild(ElementSv);

        // tim vi tri cua phan tu 
        const svIndex = listSv.findIndex((sv) => {
            return sv.maSv = svObj.maSv;
        })

        if (svIndex !== -1) {
            listSv.splice(svIndex, 1);
            localStorage.setItem('listSv', JSON.stringify(listSv));
        }
    })


    const editBtn = ElementSv.querySelector('.edit-Btn');
    editBtn.addEventListener('click', () => {
        tenSvElement.value = svObj.tenSv;
        emailSvElement.value = svObj.email;
        courseElement.value = svObj.khoaHoc;
        diemToanSvElement.value = svObj.diemToan;
        diemLyElement.value = svObj.diemLy;
        diemHoaElement.value = svObj.diemHoa;
    })

    return ElementSv;
}

for (const sinhvien of listSv) {
    // const inputSv = document.querySelector('.inputSv');
    // const templateSv = document.querySelector('.templateSv');
    // const fragmentSv = templateSv.content.cloneNode(true);
    // const ElementSv = fragmentSv.querySelector('.dataSv');
    // const msvElement = ElementSv.querySelector('.msv');
    // msvElement.innerText = sinhvien.maSv;
    // const tsvElement = ElementSv.querySelector('.tsv');
    // tsvElement.innerText = sinhvien.tenSv;
    // const emailElement = ElementSv.querySelector('.email');
    // emailElement.innerText = sinhvien.email;
    // const courseElement = ElementSv.querySelector('.khoahoc');
    // courseElement.innerText = sinhvien.khoaHoc === '1' ? 'KH001' : 'KH002';
    // const dobElement = ElementSv.querySelector('.dob');
    // dobElement.innerText = sinhvien.ngaySinh;
    // const dtbElement = ElementSv.querySelector('.diemTB');
    // const diemTrb = (sinhvien.diemToan + sinhvien.diemLy + sinhvien.diemHoa) / 3
    // dtbElement.innerText = diemTrb.toFixed(2);

    const ElementSv = buildSvTemplate(sinhvien);



    tableBodyElement.appendChild(ElementSv);

}

const addBtn = document.querySelector('#add-btn');

addBtn.addEventListener('click', handleAddSv);






function handleAddSv(event) {
    event.preventDefault();
    const tenSvElement = document.querySelector('#txtTenSV');
    // const maSvElement = document.querySelector('#txtMaSV');
    // const emailSvElement = document.querySelector('#txtEmail');
    // const passSvElement = document.querySelector('#txtPass');
    // const dobSvElement = document.querySelector('#txtNgaySinh');
    // const diemToanSvElement = document.querySelector('#txtDiemToan');
    // const diemLyElement = document.querySelector('#txtDiemLy');
    // const diemHoaElement = document.querySelector('#txtDiemHoa');
    // const courseElement = document.querySelector('#khSV');
    // check dieu kien
    let isValid = true
    const inputArr = [tenSvElement, emailSvElement, passSvElement, diemToanSvElement, diemLyElement, diemHoaElement];

    for (const element of inputArr) {
        const inputType = element.getAttribute('data-inputType');
        const inputName = element.getAttribute('data-name');



        if (inputType === INPUT_TYPE.text) {
            if (!inputType || input.value.length < 4) {
                element.nextElementSibling.style.display = 'block';
                element.nextElementSibling.innerText = `${inputName} is not valid`;
                isValid = false;
            }
        }
    }
    // neu kh dung thi dung lai
    if (!isValid) {
        return;
    }
    // check isedit
    if (editID) {
        const editElement = listSv.find((sv) => {
            return sv.maSv === editID;
        })
        editElement.tenSv = tenSvElement.value;
        editElement.email = emailSvElement.value;
        editElement.khoaHoc = courseElement.value;
        editElement.diemToan = Number(diemToanSvElement.value);
        editElement.diemLy = Number(diemLyElement.value);
        editElement.diemHoa = Number(diemHoaElement.value);

        tableBodyElement.innerHTML = '';
        for (const sinhvien of listSv) {
            const ElementSv = buildSvTemplate(sinhvien);
            tableBodyElement.appendChild(ElementSv);
        }
        formSv.reset();
        return;
    }


    // goi nhung cai input
    const newSv = {

        tenSv: tenSvElement.value,
        maSv: 'MSV-' + currentCountSv,
        email: emailSvElement.value,
        matkhau: passSvElement.value,
        ngaySinh: dobSvElement.value,
        khoahoc: courseElement.value,
        diemToan: Number(diemToanSvElement.value),
        diemLy: Number(diemLyElement.value),
        diemHoa: Number(diemHoaElement.value)

    }
    //  them vao local storage
    listSv.push(newSv);
    localStorage.setItem('listSv', JSON.stringify(listSv));
    // tao ra template trong table
    const newSvElement = buildSvTemplate(newSv);
    tableBodyElement.appendChild(newSvElement);


    // reset form
    const formSv = document.querySelector('#addSvForm');
    formSv.reset();

    // tang msv +1 
    currentCountSv++;
    localStorage.setItem('msvCount', currentCountSv);

}




