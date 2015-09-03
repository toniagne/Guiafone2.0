<?php 


if(PATH_SEPARATOR == ";") $quebra_linha = "\r\n"; //Se for Windows
else $quebra_linha = "\n"; //Se "nÃ£o for Windows"

$emailsender='guiafonejp@jornaldopovo.com.br'; // Substitua essa linha pelo seu e-mail@seudominio
// Passando os dados obtidos pelo formulário para as variáveis abaixo
$nomeremetente     = "APP GUIAFONE MOBILE";
$emailremetente    = "guiafonejp@jornaldopovo.com.br";
$emaildestinatario = "gilmar@jornaldopovo.com.br";
$assunto           = "SUGESTÕES VIA APP";
$mensagem          = "CONTATO VINDO DO APP - SUGESTÕES";
 

/* Montando a mensagem a ser enviada no corpo do e-mail. */
$mensagemHTML = ' 
<p>ASSUNTO: <b><i>'.utf8_decode($_GET['assunto']).'</i></b></p>
<p>TELEFONE: <b><i>'.utf8_decode($_GET['telefone']).'</i></b></p>
<p>E-MAIL: <b><i>'.utf8_decode($_GET['email']).'</i></b></p>
<p>OBSERVACOES: <b><i>'.utf8_decode($_GET['texto']).'</i></b></p>
<hr>';
 
 
/* Montando o cabeÃ§alho da mensagem  */
$headers = "MIME-Version: 1.1" .$quebra_linha;
$headers .= "Content-type: text/html; charset=iso-8859-1" .$quebra_linha;
// Perceba que a linha acima contém "text/html", sem essa linha, a mensagem não chegará formatada.
$headers .= "From: " . $emailsender.$quebra_linha;
$headers .= "Reply-To: " . $emailremetente . $quebra_linha;
// Note que o e-mail do remetente será usado no campo Reply-To (Responder Para)
 
/* Enviando a mensagem */
//É obrigatório o uso do parâmetro -r (concatenação do "From na linha de envio"), aqui na Locaweb:
if(!mail($emaildestinatario, $assunto, $mensagemHTML, $headers ,"-r".$emailsender)){ // Se for Postfix
    $headers .= "Return-Path: " . $emailsender . $quebra_linha; // Se "não for Postfix"
    mail($emaildestinatario, $assunto, $mensagemHTML, $headers );
}
 
/* Mostrando na tela as informações enviadas por e-mail  */
print "Mensagem <b>$assunto</b> enviada com sucesso!<br><br>
De: $emailsender<br>
Para: $emaildestinatario<br>
<p><a href='".$_SERVER["HTTP_REFERER"]."'>Voltar</a></p>"
 
 
?>