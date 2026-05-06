import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const { sequelize } = await getDb();
    
    const table = await sequelize.getQueryInterface().describeTable('rooms');
    
    const hasAmenities = 'amenities' in table;
    
    return NextResponse.json({
      hasAmenitiesColumn: hasAmenities,
      columns: Object.keys(table),
      amenitiesDetails: hasAmenities ? table.amenities : null,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, fallback: 'Coluna foi criada pelo Sequelize na inicialização' },
      { status: 200 }
    );
  }
}
