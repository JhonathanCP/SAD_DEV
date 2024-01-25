import jsPDF from 'jspdf';

export const generarPDF = (datos) => {
    const pdf = new jsPDF();

    // Establecer la fuente y tamaño de letra
    pdf.setFont('helvetica');
    pdf.setFontSize(12);

    // Título del PDF
    pdf.text('FORMATO DE ADMINISTRACION DE USUARIOS SAD - ESSALUD', 14, 10);

    // Contenido del formulario
    pdf.text(`DNI del solicitante: ${datos.dni}`, 14, 20);
    pdf.text(`Nombre del solicitante: ${datos.nombreCompleto}`, 14, 30);
    pdf.text(`Cargo del solicitante: ${datos.cargoSolicitante}`, 14, 40);
    pdf.text(`Correo institucional: ${datos.correoInstitucional}`, 14, 50);
    pdf.text(`Celular: ${datos.celular}`, 14, 60);
    pdf.text(`Nombre del jefe inmediato: ${datos.nombreJefeInmediato}`, 14, 70);
    pdf.text(`Cargo del jefe inmediato: ${datos.cargoJefeInmediato}`, 14, 80);

    // Módulo solicitado
    pdf.text('Módulo solicitado:', 14, 90);
    datos.moduloSolicitado.forEach((modulo, index) => {
        pdf.text(`- ${modulo}`, 20, 100 + index * 10);
    });

    // Reportes solicitados
    pdf.text('Reportes solicitados:', 14, 130);
    datos.reportesSolicitados.forEach((reporte, index) => {
        pdf.text(`- ${reporte}`, 20, 140 + index * 10);
    });

    // Régimen laboral
    pdf.text('Régimen laboral:', 14, 170);
    datos.regimenLaboral.forEach((regimen, index) => {
        pdf.text(`- ${regimen}`, 20, 180 + index * 10);
    });

    // Sustento del pedido
    pdf.text(`Sustento del pedido: ${datos.sustentoPedido}`, 14, 210);

    // Pie de página con líneas para las firmas
    const longitudFirmaSolicitante = pdf.getStringUnitWidth('FIRMA DEL SOLICITANTE') * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const longitudFirmaJefe = pdf.getStringUnitWidth('FIRMA DEL JEFE INMEDIATO') * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const centroPagina = pdf.internal.pageSize.width / 2;
    const inicioFirmaSolicitante = centroPagina - longitudFirmaSolicitante - 5;
    const inicioFirmaJefe = centroPagina + 5;
    pdf.line(inicioFirmaSolicitante, pdf.internal.pageSize.height - 20, inicioFirmaSolicitante + longitudFirmaSolicitante, pdf.internal.pageSize.height - 20);
    pdf.text('FIRMA DEL SOLICITANTE', inicioFirmaSolicitante, pdf.internal.pageSize.height - 15);
    pdf.line(inicioFirmaJefe, pdf.internal.pageSize.height - 20, inicioFirmaJefe + longitudFirmaJefe, pdf.internal.pageSize.height - 20);
    pdf.text('FIRMA DEL JEFE INMEDIATO', inicioFirmaJefe, pdf.internal.pageSize.height - 15);

    // Guardar el PDF
    pdf.save('formulario.pdf');
};