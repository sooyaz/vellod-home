import { NextResponse } from "next/server";

import { getSheetData } from "@/services/googleSheet";

export async function GET() {
  try {
    const spreadsheetId = process.env.FAMILY_SHEET_ID;
    const firstSheetRange = process.env.GOOGLE_SHEET_RANGE || "sheet1!A1:Z1000";
    const secondSheetRange = process.env.GOOGLE_SHEET_RANGE2 || "sheet2!A1:Z1000";

    if (!spreadsheetId) {
      throw new Error("FAMILY_SHEET_ID가 설정되지 않았습니다.");
    }

    const attendance = await getSheetData(
      spreadsheetId,
      firstSheetRange
    );

    const ledger = await getSheetData(
      spreadsheetId,
      secondSheetRange
    );

    return NextResponse.json({
      attendance,
      ledger,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Google Sheet 데이터를 불러오지 못했습니다.",
      },
      {
        status: 500,
      }
    );
  }
}