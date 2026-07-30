export interface ColoringCategory {

  /**
   * 카테고리 ID
   * ex) a
   */
  id: string;

  /**
   * 화면에 표시될 이름
   * ex) A
   */
  title: string;

  /**
   * 카테고리 설명
   */
  description: string;

  /**
   * 대표 썸네일
   */
  thumbnail: string;

}
export interface ColoringTemplate {
  /**
   * 고유 ID
   */
  id: string;
  /**
   * 화면 제목
   */
  title: string;
  /**
   * 카테고리
   */
  category: string;
  /**
   * 도안 이미지
   */
  image: string;
  /**
   * 선 색상
   */
  lineColor: string;
}