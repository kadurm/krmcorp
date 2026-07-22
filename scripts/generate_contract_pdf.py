import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT, TA_RIGHT
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    """Canvas de duas passagens para adicionar rodapé com paginação 'Página X de Y'"""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            super().showPage()
        super().save()

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))
        # Linha do rodapé
        self.setLineWidth(0.5)
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.line(40, 40, A4[0] - 40, 40)
        
        # Texto do rodapé
        text_left = "KrM Corp — Contrato de Prestação de Serviços — Michel Juliano Santos Lima"
        text_right = f"Página {self._pageNumber} de {page_count}"
        
        self.drawString(40, 28, text_left)
        self.drawRightString(A4[0] - 40, 28, text_right)
        self.restoreState()


def build_pdf(filename="Contrato_Michel_Juliano_Santos_Lima.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=40,
        rightMargin=40,
        topMargin=45,
        bottomMargin=55
    )

    styles = getSampleStyleSheet()
    
    # Estilos customizados
    header_title_style = ParagraphStyle(
        'HeaderTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor("#0F172A"),
        alignment=TA_CENTER
    )
    
    header_subtitle_style = ParagraphStyle(
        'HeaderSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor("#D97706"), # Amber / Gold Accent
        alignment=TA_CENTER,
        spaceAfter=15
    )

    doc_title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor("#1E293B"),
        alignment=TA_CENTER,
        spaceBefore=8,
        spaceAfter=12
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#334155"),
        alignment=TA_JUSTIFY,
        spaceAfter=7
    )

    clause_title_style = ParagraphStyle(
        'ClauseTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=colors.HexColor("#0F172A"),
        spaceBefore=10,
        spaceAfter=5,
        keepWithNext=True
    )

    party_label_style = ParagraphStyle(
        'PartyLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#0F172A")
    )

    party_value_style = ParagraphStyle(
        'PartyValue',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#334155")
    )

    signature_label_style = ParagraphStyle(
        'SigLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#1E293B"),
        alignment=TA_CENTER
    )

    signature_sub_style = ParagraphStyle(
        'SigSub',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10,
        textColor=colors.HexColor("#64748B"),
        alignment=TA_CENTER
    )

    story = []

    # Cabeçalho Principal
    story.append(Paragraph("KrM Corp", header_title_style))
    story.append(Paragraph("TECNOLOGIA & MARKETING ESTRATÉGICO", header_subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#CBD5E1"), spaceAfter=10))

    story.append(Paragraph("CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE DESENVOLVIMENTO TECNOLÓGICO, MANUTENÇÃO, GESTÃO DE TRÁFEGO PAGO E COMISSIONAMENTO DE VENDAS", doc_title_style))

    # Tabela de Qualificação das Partes
    parties_data = [
        [
            Paragraph("<b>CONTRATADO:</b>", party_label_style),
            Paragraph("<b>CARLOS EDUARDO RIBEIRO MENEZES (KrM Corp)</b><br/>CNPJ: 41.390.829/0001-25<br/>Montes Claros - MG", party_value_style)
        ],
        [
            Paragraph("<b>CONTRATANTE:</b>", party_label_style),
            Paragraph("<b>MICHEL JULIANO SANTOS LIMA</b><br/>CPF: 019.230.536-04<br/>Endereço: Rua Lafetá, nº 95, Apto 313, Bairro Centro, Montes Claros - MG", party_value_style)
        ]
    ]

    parties_table = Table(parties_data, colWidths=[95, 420])
    parties_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F8FAFC")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#E2E8F0")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('PADDING', (0,0), (-1,-1), 7),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(parties_table)
    story.append(Spacer(1, 10))

    story.append(Paragraph("As partes acima qualificadas têm, entre si, justo e acordado o presente Contrato de Prestação de Serviços, regido pelas cláusulas e condições a seguir expostas:", body_style))

    # Cláusula 1
    story.append(Paragraph("CLÁUSULA PRIMEIRA - DO OBJETO", clause_title_style))
    story.append(Paragraph(
        "1.1. O presente contrato tem por objeto a prestação de serviços técnicos e especializados de tecnologia da informação, marketing digital e tráfego pago pelo <b>CONTRATADO</b> em favor do <b>CONTRATANTE</b>, englobando:<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;<b>a)</b> Criação e implementação da 1ª (primeira) <b>Landing Page</b> focada na oferta e conversão do produto <i>Low-Ticket</i> do CONTRATANTE;<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;<b>b)</b> Serviços contínuos de <b>manutenção técnica</b>, suporte e otimização da referida Landing Page;<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;<b>c)</b> Gestão contínua de <b>Tráfego Pago</b> (anúncios online) para promoção constante das vendas do produto <i>Low-Ticket</i> e demais soluções;<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;<b>d)</b> Desenvolvimento e criação do <b>Sistema Web/Plataforma personalizada</b> do CONTRATANTE.",
        body_style
    ))

    # Cláusula 2
    story.append(Paragraph("CLÁUSULA SEGUNDA - DO ESCOPO DAS ETAPAS E TRÁFEGO PAGO", clause_title_style))
    story.append(Paragraph(
        "2.1. <b>ETAPA 1 – LANDING PAGE, MANUTENÇÃO E TRÁFEGO PAGO:</b><br/>"
        "• Design, desenvolvimento front-end, integração de formulários/checkout e publicação da 1ª Landing Page.<br/>"
        "• Manutenção mensal preventiva e corretiva, garantindo estabilidade, segurança e pleno funcionamento da página.<br/>"
        "• <b>Gestão Contínua de Tráfego Pago:</b> Planejamento, criação, veiculação e otimização constante de campanhas de anúncios para alavancagem diária de vendas.<br/>"
        "• <i>Parágrafo Único:</i> A verba/saldo financeiro de investimento direto nas plataformas de anúncios (ex: Meta Ads, Google Ads) é de responsabilidade financeira exclusiva do <b>CONTRATANTE</b>.<br/><br/>"
        "2.2. <b>ETAPA 2 – DESENVOLVIMENTO DO SISTEMA:</b><br/>"
        "• O início da produção do Sistema dará-se <b>após a conclusão da primeira etapa</b> (entrega da Landing Page / 1ª etapa de vendas do produto <i>Low-Ticket</i>).<br/>"
        "• A produção da Etapa 2 não está sujeita a condicionantes de desempenho ou metas extras, bastando a conclusão da Etapa 1.",
        body_style
    ))

    # Cláusula 3
    story.append(Paragraph("CLÁUSULA TERCEIRA - DA REMUNERAÇÃO E FORMA DE PAGAMENTO", clause_title_style))
    
    # Tabela com resumo de valores
    financial_data = [
        [Paragraph("<b>Item / Serviço</b>", party_label_style), Paragraph("<b>Valor e Condição de Pagamento</b>", party_label_style)],
        [
            Paragraph("<b>1ª Landing Page, Manutenção & Tráfego Pago</b>", party_value_style),
            Paragraph("<b>R$ 600,00</b> iniciais (Setup) + <b>R$ 600,00 mensais recorrentes</b> de manutenção e gestão de tráfego a partir do mês subsequente.", party_value_style)
        ],
        [
            Paragraph("<b>Desenvolvimento do Sistema Completo</b>", party_value_style),
            Paragraph("<b>R$ 2.000,00</b> pagos pelo CONTRATANTE <b>no ato de início da produção do Sistema</b> (após a conclusão da 1ª etapa).", party_value_style)
        ],
        [
            Paragraph("<b>Comissionamento sobre Vendas</b>", party_value_style),
            Paragraph("<b>10% (dez por cento) dos LUCROS DAS VENDAS</b> de todos os produtos comercializados na estrutura desenvolvida e promovida.", party_value_style)
        ]
    ]

    fin_table = Table(financial_data, colWidths=[195, 320])
    fin_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#F1F5F9")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(fin_table)
    story.append(Spacer(1, 6))

    story.append(Paragraph(
        "3.4. A apuração dos 10% do lucro das vendas será realizada mensalmente, devendo o CONTRATANTE fornecer relatórios financeiros e efetuar o repasse em até 5 dias úteis.<br/>"
        "3.5. Todos os pagamentos deverão ser realizados via transferência PIX ou depósito em conta bancária de titularidade do CONTRATADO.",
        body_style
    ))

    # Cláusula 4
    story.append(Paragraph("CLÁUSULA QUARTA - DAS OBRIGAÇÕES DO CONTRATADO", clause_title_style))
    story.append(Paragraph(
        "4.1. Prestar os serviços com qualidade técnica, zelando pela pontualidade, bom desempenho das ferramentas e otimização do tráfego pago.<br/>"
        "4.2. Manter a Landing Page no ar, realizando correções de falhas técnicas sob sua responsabilidade.<br/>"
        "4.3. Gerenciar e otimizar constantemente as campanhas de anúncios para promover as vendas.<br/>"
        "4.4. Prestar suporte técnico e manter sigilo sobre os dados e estratégias do CONTRATANTE.",
        body_style
    ))

    # Cláusula 5
    story.append(Paragraph("CLÁUSULA QUINTA - DAS OBRIGAÇÕES DO CONTRATANTE", clause_title_style))
    story.append(Paragraph(
        "5.1. Fornecer tempestivamente todos os materiais, textos, dados, acessos e verba financeira para os anúncios de tráfego pago.<br/>"
        "5.2. Efetuar pontualmente os pagamentos dos valores fixos, da mensalidade recorrente e do valor de início da produção do Sistema.<br/>"
        "5.3. Fornecer com transparência os relatórios financeiros de vendas e lucros para cálculo exato da comissão de 10% dos lucros.<br/>"
        "5.4. Não alterar códigos-fonte ou estruturas técnicas sem prévia autorização do CONTRATADO.",
        body_style
    ))

    # Cláusula 6
    story.append(Paragraph("CLÁUSULA SEXTA - DA PROPRIEDADE INTELECTUAL E DIREITOS", clause_title_style))
    story.append(Paragraph(
        "6.1. Após a quitação integral de todos os valores pactuados (incluindo o valor do Sistema de R$ 2.000,00 e comissões devidas), os direitos de uso e exploração da Landing Page e do Sistema pertencerão ao CONTRATANTE.<br/>"
        "6.2. O CONTRATADO retém os direitos morais sobre as metodologias de código e bibliotecas proprietárias.",
        body_style
    ))

    # Cláusula 7
    story.append(Paragraph("CLÁUSULA SÉTIMA - DA CONFIDENCIALIDADE E PROTEÇÃO DE DADOS (LGPD)", clause_title_style))
    story.append(Paragraph(
        "7.1. Ambas as partes comprometem-se a manter sigilo absoluto sobre todas as informações estratégicas, dados de clientes e métricas de vendas.<br/>"
        "7.2. As partes declaram conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).",
        body_style
    ))

    # Cláusula 8
    story.append(Paragraph("CLÁUSULA OITAVA - DA VIGÊNCIA E RESCISÃO", clause_title_style))
    story.append(Paragraph(
        "8.1. O presente contrato vigora por prazo indeterminado a partir da data de sua assinatura.<br/>"
        "8.2. Qualquer das partes poderá rescindir o contrato mediante comunicação por escrito com antecedência mínima de <b>30 (trinta) dias</b>.<br/>"
        "8.3. A rescisão não isenta o CONTRATANTE do pagamento das mensalidades vencidas, das parcelas do Sistema em produção e da apuração proporcional dos 10% dos lucros das vendas até a data de encerramento.<br/>"
        "8.4. O descumprimento injustificado de qualquer das cláusulas faculta à parte inocente rescindir o contrato de imediato.",
        body_style
    ))

    # Cláusula 9
    story.append(Paragraph("CLÁUSULA NONA - DO FORO", clause_title_style))
    story.append(Paragraph(
        "9.1. Para dirimir quaisquer controvérsias oriundas deste Contrato, as partes elegem o Foro da Comarca de <b>Montes Claros - MG</b>, com renúncia expressa a qualquer outro.",
        body_style
    ))

    story.append(Spacer(1, 10))
    story.append(Paragraph("Montes Claros - MG, _____ de ____________________ de 2026.", ParagraphStyle('DateText', parent=body_style, alignment=TA_CENTER)))
    story.append(Spacer(1, 15))

    # Seção de Assinaturas
    sig_data = [
        [
            Paragraph("__________________________________________<br/><b>CONTRATADO</b><br/>CARLOS EDUARDO RIBEIRO MENEZES<br/>KrM Corp – CNPJ nº 41.390.829/0001-25", signature_label_style),
            Paragraph("__________________________________________<br/><b>CONTRATANTE</b><br/>MICHEL JULIANO SANTOS LIMA<br/>CPF nº 019.230.536-04", signature_label_style)
        ],
        [Paragraph("", signature_label_style), Paragraph("", signature_label_style)],
        [
            Paragraph("__________________________________________<br/><b>TESTEMUNHA 1</b><br/>Nome:<br/>CPF:", signature_sub_style),
            Paragraph("__________________________________________<br/><b>TESTEMUNHA 2</b><br/>Nome:<br/>CPF:", signature_sub_style)
        ]
    ]

    sig_table = Table(sig_data, colWidths=[250, 250])
    sig_table.setStyle(TableStyle([
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'BOTTOM'),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))

    story.append(KeepTogether(sig_table))

    # Build PDF
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF gerado com sucesso: {os.path.abspath(filename)}")

if __name__ == "__main__":
    build_pdf()
