import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  MessageCircle,
  Send,
  Bot,
  User,
  Phone,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  texto: string;
  esUsuario: boolean;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    texto: '¡Hola! Soy el asistente virtual de Smart Chancay. ¿En qué puedo ayudarte hoy?',
    esUsuario: false,
    timestamp: new Date(),
  },
];

const respuestasBot: Record<string, string> = {
  terreno: 'Tu terreno con partida P001234567 está en estado "Compatible" con semáforo verde. Ya fue publicado en el Marketplace y tienes 2 empresas interesadas. ¿Deseas que te contactemos con ellas?',
  estado: 'El estado actual de tu proceso es:\n✅ Registrado\n✅ Analizado\n✅ Compatible\n🔄 En Matching (actual)\n⏳ Formalización (pendiente)\n\nEstás a un paso del matching con empresas.',
  documentos: 'Para avanzar con la formalización necesitas:\n1. ✅ Partida registral (ya lo tienes)\n2. ✅ Análisis legal (completado)\n3. ⏳ Certificado de zonificación\n4. ⏳ Declaración jurada\n\n¿Quieres que te envíe el checklist completo?',
  beneficios: 'Tu terreno califica a los siguientes beneficios ZEEP:\n🟢 Exoneración IGV\n🟢 Depreciación acelerada\n🟢 Ventanilla única\n\nPara acceder, debes completar el proceso de matching con una empresa.',
  proveedor: 'Te recomiendo estos proveedores validados por CIP Lima:\n\n1. Estudio Jurídico Chancay (⭐4.8)\n   Especialistas en saneamiento legal\n\n2. GeoTec Perú (⭐4.5)\n   Levantamiento topográfico\n\n¿Deseas que coordine una cita?',
  default: 'Entiendo tu consulta. Para darte una respuesta más precisa, ¿podrías indicarme si tu consulta es sobre:\n1. Estado de tu terreno\n2. Documentos necesarios\n3. Beneficios ZEEP\n4. Proveedores\n\nO escríbeme tu pregunta específica.',
};

export default function WhatsApp() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      texto: input,
      esUsuario: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let respuesta = respuestasBot.default;

      if (lowerInput.includes('terreno') || lowerInput.includes('partida')) {
        respuesta = respuestasBot.terreno;
      } else if (lowerInput.includes('estado') || lowerInput.includes('proceso')) {
        respuesta = respuestasBot.estado;
      } else if (lowerInput.includes('documento') || lowerInput.includes('checklist')) {
        respuesta = respuestasBot.documentos;
      } else if (lowerInput.includes('beneficio') || lowerInput.includes('zeep')) {
        respuesta = respuestasBot.beneficios;
      } else if (lowerInput.includes('proveedor') || lowerInput.includes('abogado')) {
        respuesta = respuestasBot.proveedor;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        texto: respuesta,
        esUsuario: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Canal WhatsApp</h1>
        <p className="text-muted-foreground mt-1">
          Consulta el estado de tu terreno y próximos pasos por WhatsApp
        </p>
      </div>

      {/* Info Banner */}
      <div className="card-elevated p-4 bg-[#25D366]/10 border-[#25D366]/20 flex items-center gap-3">
        <Phone className="h-5 w-5 text-[#25D366]" />
        <div>
          <p className="font-medium text-foreground">Simulación de Canal WhatsApp</p>
          <p className="text-sm text-muted-foreground">
            Esta es una demostración de cómo funcionará el asistente por WhatsApp
          </p>
        </div>
      </div>

      {/* Chat Container */}
      <div className="card-elevated overflow-hidden max-w-2xl mx-auto">
        {/* Chat Header */}
        <div className="bg-[#075E54] text-white p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold">Smart Chancay Bot</p>
            <p className="text-xs text-white/70">
              {isTyping ? 'Escribiendo...' : 'En línea'}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[400px] overflow-y-auto p-4 bg-[#ECE5DD] space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex',
                message.esUsuario ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[80%] rounded-lg p-3 shadow-sm',
                  message.esUsuario
                    ? 'bg-[#DCF8C6] rounded-tr-none'
                    : 'bg-white rounded-tl-none'
                )}
              >
                <p className="text-sm text-foreground whitespace-pre-line">{message.texto}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-[#F0F0F0] flex gap-2">
          <Input
            placeholder="Escribe tu mensaje..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="bg-white"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-[#075E54] hover:bg-[#054d44]"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-2xl mx-auto">
        <p className="text-sm text-muted-foreground mb-3">Consultas frecuentes:</p>
        <div className="flex flex-wrap gap-2">
          {[
            '¿Cuál es el estado de mi terreno?',
            '¿Qué documentos necesito?',
            '¿Qué beneficios ZEEP aplican?',
            'Recomiéndame un proveedor',
          ].map((pregunta) => (
            <Button
              key={pregunta}
              variant="outline"
              size="sm"
              onClick={() => {
                setInput(pregunta);
              }}
              className="text-xs"
            >
              {pregunta}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
