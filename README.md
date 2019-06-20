# anduschain-miner
채굴기 개발 안내
채굴기 베타버전 개발이 완료되었습니다.
채굴기는 채굴의 용도로만 사용되기에 다온 전송 / 컨트렉트 발생과 같은 기능은 아직 없습니다.

설치방법
1. 기존의 다온월렛의 keystore를 백업합니다.
	- 다온월렛 프로그램 상단. 계정 - 백업 - 계정키 백업 클릭시 나오는 폴더에서 
	keystore 폴더안의 파일들을 따로 저장합니다.(ex> UTC--01...)

2. 기존의 다온 월렛을 삭제합니다.
	- 기존 다온월렛 삭제 방법
	1. 제어판 – 프로그램 추가제거 - Daon Wallet 삭제
	2.  C:\Users\{사용자}\AppData\Roaming\Daon Wallet 폴더를 삭제
	3.  C:\Users\{사용자}\AppData\Roaming\AndusChain\geth 폴더를 삭제.
	4. C:\Program Files\Daon-Wallet 폴더 가 있다면 삭제

3. 채굴기를 다운로드 받습니다.
	https://github.com/anduschain/anduschain-miner/releases
	위의 페이지로 이동하셔서
	anduschain-miner-0.7.2.Setup_win_x64.exe -> 클릭 (윈도우 버전)
	위의 프로그램을 다운받은 뒤 설치

4. 백업한 키 계정을 옮깁니다.
	1번에서 따로 저장한 키 파일을 옮깁니다
	
	위치 :  프로그램상단 - AndusChain-miner -> backup 클릭시 나오는 폴더에서
		AndusChain -> testnet -> keystore 폴더 안으로 이동
	위의 키 파일을 옮겨 주셔야 기존에 지급 받은 계정을 새로운 채굴 프로그램에서도 사용가능

5. 3번에서 받은 프로그램을 실행 하신 뒤 계정을 확인합니다.

6. 왼쪽아래의 START 버튼으로 마이닝을 시작 / 종료 하실 수 있습니다.
