#include <iostream>
#include <fstream>
#include <regex>
#include <string>
#include <queue>

int totalLines = 0;
int matchingLines = 0;

int check(std::ifstream &file, std::regex &pattern)
{
	if (!file.is_open())
	{
		std::cerr << "로그 파일을 열 수 없습니다." << std::endl;
		return 1;
	}

	std::string line;

	// 파일에서 각 줄 읽어들이기
	while (std::getline(file, line))
	{
		if (!line.empty() && line[line.length() - 1] == '\r')
		{
			line.erase(line.length() - 1);
		} // 윈도우 줄바꿈 문자가 \r\n이고, C++의 getline함수는 줄바꿈문자로 \n을 기대함
		totalLines++;

		// 정규표현식과 매칭되는지 확인
		if (std::regex_match(line, pattern))
		{
			matchingLines++;
		}
	}
	return 0;
}

int main()
{
	// 정규표현식 설정
	std::regex pattern("\\d{2}:\\d{2}:\\d{2}\\.\\d{3} DEBUG --- org\\.springframework\\.capstone\\.[a-zA-Z]+   : [a-zA-Z]+\\.[a-zA-Z]+\\([^;]*\\);[^;]*;\\d+ms;");

	std::queue<std::ifstream> files;
	// 로그 파일 열기
	files.push(std::ifstream("log-2024-04-06.log"));
	files.push(std::ifstream("log-2024-04-07.log"));
	files.push(std::ifstream("log-2024-04-08.log"));

	while (!files.empty())
	{
		if (check(files.front(), pattern))
			return 1;
		files.front().close();
		files.pop();
		// 파일 닫고, 빼기
	}

	// 결과 출력
	std::cout << "전체 줄 수: " << totalLines << std::endl;
	std::cout << "정규표현식을 만족하는 줄 수: " << matchingLines << std::endl;
	std::cout << "정규표현식을 만족하는 비율: " << (static_cast<double>(matchingLines) / totalLines) * 100 << "%" << std::endl;

	return 0;
}
