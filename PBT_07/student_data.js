/*Cho mảng dữ liệu:
const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },];

Viết code thực hiện (KHÔNG dùng thư viện, chỉ loops + if/else):
1. Tính điểm trung bình (math×0.4 + physics×0.3 + cs×0.3) cho mỗi sinh viên
2. Xếp loại: ≥8.0 Giỏi, ≥6.5 Khá, ≥5.0 Trung bình, <5.0 Yếu
3. In bảng kết quả:
| STT | Tên    | TB   | Xếp loại    |
|-----|--------|------|-------------|
| 1   | An     | 8.0  | Giỏi        |
| 2   | Bình   | 7.2  | Khá         |
...

4. Đếm số SV mỗi xếp loại
5. Tìm SV có điểm TB cao nhất và thấp nhất
6. Tính điểm TB toàn lớp cho từng môn
7. Bonus: Tính điểm TB theo giới tính*/

const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];
// Biến dùng để thống kê xếp loại
let countGioi = 0, countKha = 0, countTrungBinh = 0, countYeu = 0;

// Biến chứa điểm TB cao nhất và thấp nhất của sinh viên
let minScoreStudent = null, maxScoreStudent = null;

// Biến chứa tổng điểm và điểm TB toàn lớp cho từng môn
let totalMath = 0, totalPhysics = 0, totalCS = 0;
let averageMath = 0, averagePhysics = 0, averageCS = 0;

// Biến chứa điểm TB theo giới tính
let totalMale = 0, totalFemale = 0;
let averageMale = 0, averageFemale = 0;

// Biến đếm số lượng sinh viên theo giới tính
countMale = 0, countFemale = 0;

// In bảng kết quả
console.log(`| STT | Tên    | TB   | Xếp loại    |`);
console.log(`|-----|--------|------|-------------|`);

for (let i=0; i<students.length; i++){
    // 1. Tính điểm trung bình (math×0.4 + physics×0.3 + cs×0.3) cho mỗi sinh viên
    let gpa = students[i].math*0.4 + students[i].physics*0.3 + students[i].cs*0.3;

    // 2. Xếp loại: ≥8.0 Giỏi, ≥6.5 Khá, ≥5.0 Trung bình, <5.0 Yếu
    // 4. Đếm số SV mỗi xếp loại
    let rank = "";
    if (gpa >= 8.0){
        rank = "Giỏi";
        countGioi++;
    }
    else if (gpa >= 6.5){
        rank = "Khá";
        countKha++;
    }
    else if (gpa >= 5.0){
        rank = "Trung bình";
        countTrungBinh++;
    }
    else if (gpa < 5.0){
        rank = "Yếu";
        countYeu++;
    }

    // 3. In bảng kết quả
    console.log(`| ${(i+1).toString().padEnd(3)} | ${students[i].name.padEnd(6)} | ${gpa.toFixed(1).padEnd(4)} | ${rank.padEnd(11)} |`);

    // 5. Tìm SV có điểm TB cao nhất và thấp nhất
    if (maxScoreStudent === null || gpa > maxScoreStudent.gpa){
        maxScoreStudent = {name: students[i].name, gpa: gpa};
    }
    if (minScoreStudent === null || gpa < minScoreStudent.gpa){
        minScoreStudent = {name: students[i].name, gpa: gpa};
    }

    // 6. Tính tổng điểm của từng môn, dùng cho tính điểm TB toàn lớp cho từng môn
    totalMath += students[i].math;
    totalPhysics += students[i].physics;
    totalCS += students[i].cs;

    // 7. Tính tổng điểm theo giới tính, dùng cho tính điểm TB theo giới tính
    if (students[i].gender === "M"){
        totalMale += gpa;
        countMale++;
    }
    else if (students[i].gender === "F"){
        totalFemale += gpa;
        countFemale++;
    }
}
// 6. Tính điểm TB toàn lớp cho từng môn
let classSize = students.length;
averageMath = totalMath / classSize;
averagePhysics = totalPhysics / classSize;
averageCS = totalCS / classSize;


// 7. Bonus: Tính điểm TB theo giới tính
averageMale = totalMale / countMale;
averageFemale = totalFemale / countFemale;

// In kết quả:
console.log(`\n`);
console.log(`4. Đếm số sinh viên mỗi xếp loại`);
console.log(`Số lượng sinh viên xếp loại Giỏi: ${countGioi}`);
console.log(`Số lượng sinh viên xếp loại Khá: ${countKha}`);
console.log(`Số lượng sinh viên xếp loại Trung bình: ${countTrungBinh}`);
console.log(`Số lượng sinh viên xếp loại Yếu: ${countYeu}`);
console.log(`\n`);

console.log(`5. Tìm sinh viên có điểm TB cao nhất và thấp nhất`);
console.log(`Cao nhất: ${maxScoreStudent.name} với điểm trung bình ${maxScoreStudent.gpa.toFixed(1)}`);
console.log(`Thấp nhất: ${minScoreStudent.name} với điểm trung bình ${minScoreStudent.gpa.toFixed(1)}`);
console.log(`\n`);

console.log(`6. Tính điểm TB toàn lớp cho từng môn`);
console.log(`Toán: ${averageMath}`);
console.log(`Vật lý: ${averagePhysics}`);
console.log(`Khoa học máy tính: ${averageCS}`);
console.log(`\n`);

console.log(`7. Tính điểm TB theo giới tính`);
console.log(`Nam: ${averageMale.toFixed(3)}`);
console.log(`Nữ: ${averageFemale.toFixed(3)}`);