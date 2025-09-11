window.addEventListener("scroll", function () {
    const homeBtn = document.querySelector(".home-btn");

    if (window.scrollY > 100) { // 스크롤 100px 이상일 때
        homeBtn.style.display = "inline-block";
    } else {
        homeBtn.style.display = "none";
    }
});

$(".top-menu > li").mouseenter(function () {
    $(this).children("hr").css("transform", "scaleX(1)");
});

$(".top-menu > li").mouseleave(function () {
    $(this).children("hr").css("transform", "scaleX(0)");
});

function addToCart() {
    let countEl = document.querySelector(".count");
    let currentCount = parseInt(countEl.textContent, 10);
    countEl.textContent = currentCount + 1;
}

const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");

form.addEventListener("submit", function (e) {
    e.preventDefault(); // 기본 제출 방지 (필요 시 제거 가능)
    const keyword = input.value.trim();
    if (keyword) {
        // 원하는 검색 로직
        // 예: 검색 페이지 이동
        window.location.href = "search.html?q=" + encodeURIComponent(keyword);

        // 또는 콘솔에 출력
        // console.log("검색어:", keyword);
    } else {
        alert("검색어를 입력하세요!");
    }
});

$(".cases").click(function () {
    $(".content").toggle();
    $(".right").hide();
    $(".logo-main").hide();
    $(".information").hide();
    $(".big-main").hide();
});

$(".logo").click(function () {
    $(".right").show();
    $(".content").hide();
    $(".logo-main").hide();
    $(".sign-in").hide();
    $(".information").hide();
    $(".DVM-page").hide();
    $(".big-main").hide();
})

$(".login").click(function (e) {
    e.preventDefault(); // 이 줄이 중요!
    $(".logo-main").show();
    $(".content").hide();
    $(".right").hide();
    $(".sign-in").hide();
    $(".admin").hide();
    $(".DVM-page").hide();
    $(".information").hide();
    $(".big-main").hide();
});

$(".sign-up").click(function (e) {
    e.preventDefault(); // 이 줄이 중요!
    $(".sign-in").show();
    $(".content").hide();
    $(".right").hide();
    $(".logo-main").hide();
    $(".admin").hide();
    $(".information").hide();
    $(".DVM-page").hide();
    $(".big-main").hide();
});

$(".sign-up-form").click(function () {
    $(".sign-in").show();
    $(".logo-main").hide();
    $(".content").hide();
    $(".right").hide();
    $(".admin").hide();
    $(".information").hide();
    $(".DVM-page").hide();
    $(".big-main").hide();
})

$(".greetings-btn").click(function () {
    $(".greetings").show();
    $(".sign-in").hide();
    $(".logo-main").hide();
    $(".content").hide();
    $(".right").hide();
    $(".admin").hide();
    $(".information").hide();
    $(".DVM-page").hide();
    $(".big-main").hide();
})

$(".information-btn").click(function () {
    $(".information").show();
    $(".greetings").hide();
    $(".sign-in").hide();
    $(".logo-main").hide();
    $(".content").hide();
    $(".right").hide();
    $(".admin").hide();
    $(".DVM-page").hide();
    $(".big-main").hide();
})

$(".big").click(function () {
    $(".big-main").show();
    $(".information").hide();
    $(".greetings").hide();
    $(".sign-in").hide();
    $(".logo-main").hide();
    $(".content").hide();
    $(".right").hide();
    $(".admin").hide();
    $(".DVM-page").hide();
})

$(".shop-infor").click(function () {
    $(".DVN-page").show();
    $(".greetings").hide();
    $(".sign-in").hide();
    $(".logo-main").hide();
    $(".content").hide();
    $(".right").hide();
    $(".admin").hide();
    $(".information").hide();
    $(".big-main").hide();
})

const slides = document.querySelectorAll('.slide img');
let currentIndex = 0;

function showNextSlide() {
    slides[currentIndex].classList.remove('active'); // 현재 이미지 숨기기
    currentIndex = (currentIndex + 1) % slides.length; // 다음 이미지로 이동
    slides[currentIndex].classList.add('active'); // 다음 이미지 보이기
}

// 처음에 첫 번째 이미지 보이기
slides[currentIndex].classList.add('active');

// 3초마다 슬라이드 전환
setInterval(showNextSlide, 1000);

$(".menu-btn").click(function () {
    $(".menu-btn-hide").show();
    $(".menu-btn").hide();
})

$(".menu-btn-hide").click(function () {
    $(".menu-btn").show();
    $(".menu-btn-hide").hide();
})

$(".sub-menu-big").mouseover(function () {
    $(".sub-menu-size").show();
})
$(".sub-menu-big").mouseleave(function () {
    $(".sub-menu-size").hide();
})

document.querySelectorAll('.menu-btn-hide li > a').forEach(menu => {
    menu.addEventListener('click', function (e) {
        // 작은 화면에서만 동작
        if (window.innerWidth <= 768) {
            const parentLi = this.parentElement;
            const subMenu = parentLi.querySelector('.sub-menu, .sub-menu-size');
            if (subMenu) {
                e.preventDefault(); // 링크 동작 막기
                parentLi.classList.toggle('open');
            }
        }
    });
});

$("#register-btn").click(function () {
    const username = $("#reg-username").val();
    const password = $("#reg-password").val();

    if (!username || !password) {
        alert("아이디와 비밀번호를 입력하세요.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const isDuplicate = users.some(user => user.username === username);
    if (isDuplicate) {
        alert("이미 존재하는 아이디입니다.");
        return;
    }

    // 현재 시간 가져오기
    const now = new Date();
    const formattedTime = now.toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });

    // 새 사용자 추가 (시간 포함)
    users.push({ username, password, registeredAt: formattedTime });

    // 저장
    localStorage.setItem("users", JSON.stringify(users));

    // 콘솔 출력
    console.log(`[회원가입 완료] 아이디: ${username} | 시간: ${formattedTime}`);

    alert("회원가입 완료!");

    // 입력값 초기화
    $("#reg-username").val("");
    $("#reg-password").val("");

    // 로그인 창으로 전환
    $(".sign-in").hide();           // 회원가입 창 숨김
    $(".logo-main").show();         // 로그인 창 표시
});

$(".logo-main button").click(function (e) {
    e.preventDefault();
    const username = $(".logo-main input[type='text']").val();
    const password = $(".logo-main input[type='password']").val();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (user) {
        alert("로그인 성공!");

        // 로그인 성공 시 UI 전환
        $(".logo-main").hide();
        $(".sign-up-main").hide();

        // 관리자 페이지나 메인 페이지 표시
        $(".right").show(); // 예시로 관리자 화면 표시

    } else {
        alert("아이디 또는 비밀번호가 틀렸습니다.");
    }
});

if (user) {
    alert("로그인 성공!");
    $(".logo-main").hide();
    $(".sign-up-main").hide();
    $(".right").show();  // 관리자 화면 표시
    renderUserList();              // 회원 리스트 불러오기
}

$("a[href='#']").click(function (e) {
    e.preventDefault();
    $(".logo-main").hide();
    $(".sign-in").show();
});


let reviewCount = 0;

document.getElementById('write-review').addEventListener('click', function () {
    reviewCount++;
    document.getElementById('review-text').textContent = `리뷰 ${reviewCount}`;
});

let reviewCount1 = 0;

const writeBtn = document.getElementById('write-review');
const form1 = document.getElementById('review-form');
const submitBtn = document.getElementById('submit-review');
const countText = document.getElementById('review-count');

// 리뷰 쓰기 버튼 클릭 → 폼 보여주기
writeBtn.addEventListener('click', () => {
    form1.classList.remove('hidden');
});

// 리뷰 제출 버튼 클릭
submitBtn.addEventListener('click', () => {
    // 실제 저장 처리는 생략 (예: 서버로 전송)
    reviewCount1++;
    countText.textContent = `리뷰 ${reviewCount1}개 썼습니다`;

    // 폼 초기화 & 숨기기
    form1.reset();
    form1.classList.add('hidden');

    alert("리뷰가 제출되었습니다!");
});

